import { act, fireEvent, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, describe, expect, it, vi } from 'vitest'
import App, { categories } from './App.jsx'

afterEach(() => {
  vi.restoreAllMocks()
  vi.unstubAllGlobals()
  vi.useRealTimers()
})

async function chooseQuiz(user, category, level = 'Easy') {
  await user.click(screen.getByRole('button', { name: new RegExp(`Choose ${category}`, 'i') }))
  const levelButton = screen.getByRole('button', { name: new RegExp(level, 'i') })
  await user.click(levelButton)
  await user.click(screen.getByRole('button', { name: new RegExp(`Start ${level.toLowerCase()} quiz`, 'i') }))
}

describe('quiz dashboard and setup', () => {
  it('shows all eleven quiz categories, descriptions, and question counts', () => {
    render(<App />)

    expect(screen.getByRole('button', { name: 'Brainbox dashboard' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Your brain is your superpower!' })).toBeInTheDocument()
    expect(screen.getByText('Complete challenges, earn points, beat your score, and become a quiz champion.')).toBeInTheDocument()
    expect(screen.getByText('Quiz categories').parentElement).toHaveTextContent('11')
    expect(screen.getByText('Questions available').parentElement).toHaveTextContent('132')

    for (const name of [
      'General knowledge',
      'Science',
      'Maths',
      'Technology',
      'History',
      'Sports',
      'Programming',
      'Movies & entertainment',
      'Riddles & brain teasers',
      'Music & pop culture',
      'Mystery question',
    ]) {
      expect(screen.getByRole('button', { name: new RegExp(`Choose ${name}`, 'i') })).toBeInTheDocument()
    }

    expect(screen.getAllByText(/12 questions · 3 levels/)).toHaveLength(11)
  })

  it('has four valid and unique questions at every difficulty in every category', () => {
    const prompts = categories.flatMap((category) =>
      Object.values(category.levels).flatMap((questions) => {
        expect(questions).toHaveLength(4)
        questions.forEach((question) => {
          expect(question.options).toContain(question.answer)
        })
        return questions.map((question) => question.prompt)
      }),
    )

    expect(prompts).toHaveLength(132)
    expect(new Set(prompts).size).toBe(prompts.length)
  })

  it('spins to a category and surprise challenge that can be started', async () => {
    vi.useFakeTimers()
    vi.spyOn(Math, 'random').mockReturnValue(0)
    const { unmount } = render(<App />)

    fireEvent.click(screen.getByRole('button', { name: /spin the wheel/i }))
    expect(screen.getByRole('button', { name: /spinning/i })).toBeDisabled()

    await act(async () => {
      vi.advanceTimersByTime(4800)
    })

    expect(screen.getAllByText('General knowledge')).not.toHaveLength(0)
    expect(screen.getAllByText(/Speed round: trust your first answer/)).not.toHaveLength(0)
    fireEvent.click(screen.getByRole('button', { name: /take this challenge/i }))

    expect(screen.getByRole('heading', { name: 'Choose your quiz' })).toBeInTheDocument()
    expect(screen.getByText(/Speed round: trust your first answer/)).toBeInTheDocument()

    unmount()
  })

  it('requires a category and difficulty before starting a quiz', async () => {
    const user = userEvent.setup()
    render(<App />)

    await user.click(screen.getByRole('button', { name: /choose your challenge/i }))
    expect(screen.queryByRole('button', { name: /start quiz/i })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /science explore the natural world/i }))
    expect(screen.getByRole('heading', { name: 'Choose your level' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /start quiz/i })).toBeDisabled()

    await user.click(screen.getByRole('button', { name: /medium/i }))
    await user.click(screen.getByRole('button', { name: /start medium quiz/i }))

    expect(screen.getByRole('heading', { name: 'Which cell structure is often called the powerhouse of the cell?' })).toBeInTheDocument()
    expect(screen.getByText('SCIENCE · MEDIUM')).toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toHaveAttribute('aria-valuemax', '4')
  })

  it('awards level-based points, completes the quiz, and updates the dashboard', async () => {
    const user = userEvent.setup()
    render(<App />)
    await chooseQuiz(user, 'General knowledge')

    const answers = ['Pacific', 'Mars', '366', 'Canada']
    for (let index = 0; index < answers.length; index += 1) {
      await user.click(screen.getByRole('button', { name: new RegExp(answers[index]) }))
      expect(screen.getByText('That’s right!')).toBeInTheDocument()
      if (index < answers.length - 1) {
        await user.click(screen.getByRole('button', { name: /next question/i }))
      } else {
        await user.click(screen.getByRole('button', { name: /see results/i }))
      }
    }

    expect(screen.getByRole('heading', { name: 'Perfectly done!' })).toBeInTheDocument()
    expect(screen.getByText('points earned').parentElement).toHaveTextContent('40/40')
    expect(screen.getByText('100%')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /back to dashboard/i }))
    expect(screen.getByText('Your highest score').parentElement).toHaveTextContent('100%')
    expect(screen.getByText('General knowledge · Easy')).toBeInTheDocument()
  })

  it('starts a category-specific hard quiz and awards the hard-level points', async () => {
    const user = userEvent.setup()
    render(<App />)
    await chooseQuiz(user, 'Programming', 'Hard')

    expect(screen.getByText('PROGRAMMING · HARD')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'What does Big O notation describe?' })).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: /how resource use scales with input size/i }))
    expect(screen.getByText('points').parentElement).toHaveTextContent('30 points')
  })

  it('remembers the sound setting across screens and skips a timed-out question', async () => {
    vi.useFakeTimers()
    render(<App />)

    fireEvent.click(screen.getByRole('button', { name: 'Turn sound effects off' }))
    expect(screen.getByRole('button', { name: 'Turn sound effects on' })).toHaveAttribute('aria-pressed', 'false')
    fireEvent.click(screen.getByRole('button', { name: /choose general knowledge/i }))
    fireEvent.click(screen.getByRole('button', { name: /easy/i }))
    fireEvent.click(screen.getByRole('button', { name: /start easy quiz/i }))

    expect(screen.getByRole('timer')).toHaveAccessibleName('Time remaining: 15 seconds')
    expect(screen.getByRole('button', { name: 'Turn sound effects on' })).toHaveAttribute('aria-pressed', 'false')

    for (let second = 0; second < 15; second += 1) {
      await act(async () => {
        vi.advanceTimersByTime(1000)
      })
    }

    expect(screen.getByText(/Time’s up! The correct answer was Pacific/)).toBeInTheDocument()
    expect(screen.getByText(/Moving on in 2 seconds/)).toBeInTheDocument()
    await act(async () => {
      vi.advanceTimersByTime(2000)
    })

    expect(screen.getByRole('heading', { name: 'Which planet is known as the Red Planet?' })).toBeInTheDocument()
    expect(screen.getByRole('timer')).toHaveAccessibleName('Time remaining: 15 seconds')
  })

  it('plays distinct selection and response sound sequences for answers', async () => {
    const oscillators = []
    class MockAudioContext {
      currentTime = 0
      destination = {}
      state = 'running'

      createOscillator() {
        const oscillator = {
          frequency: { value: 0 },
          connect: vi.fn(),
          start: vi.fn(),
          stop: vi.fn(),
        }
        oscillators.push(oscillator)
        return oscillator
      }

      createGain() {
        return {
          gain: {
            setValueAtTime: vi.fn(),
            exponentialRampToValueAtTime: vi.fn(),
          },
          connect: vi.fn(),
        }
      }
    }

    vi.stubGlobal('AudioContext', MockAudioContext)
    const user = userEvent.setup()
    render(<App />)
    await chooseQuiz(user, 'General knowledge')

    await user.click(screen.getByRole('button', { name: /pacific/i }))
    expect(oscillators).toHaveLength(4)

    await user.click(screen.getByRole('button', { name: /next question/i }))
    await user.click(screen.getByRole('button', { name: /venus/i }))
    expect(oscillators).toHaveLength(7)
  })
})
