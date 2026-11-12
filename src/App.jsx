import { useEffect, useState } from 'react'

const levels = [
  { id: 'easy', name: 'Easy', points: 10, description: 'A relaxed warm-up' },
  { id: 'medium', name: 'Medium', points: 20, description: 'Ready for a challenge?' },
  { id: 'hard', name: 'Hard', points: 30, description: 'For the quiz champions' },
]

export const categories = [
  {
    id: 'general',
    name: 'General knowledge',
    description: 'A little bit of everything, from places to pop culture.',
    icon: '🌍',
    color: 'bg-orange-100 text-orange-700',
    levels: {
      easy: [
        { prompt: 'Which is the largest ocean on Earth?', options: ['Atlantic', 'Indian', 'Pacific', 'Arctic'], answer: 'Pacific', note: 'The Pacific Ocean covers more area than all of Earth’s land combined.' },
        { prompt: 'Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Mercury'], answer: 'Mars', note: 'Iron-rich dust gives Mars its reddish color.' },
        { prompt: 'How many days are in a leap year?', options: ['364', '365', '366', '367'], answer: '366', note: 'A leap year adds one day to February.' },
        { prompt: 'Which country has a maple leaf on its national flag?', options: ['Canada', 'Austria', 'Denmark', 'Ireland'], answer: 'Canada', note: 'The red maple leaf has appeared on Canada’s flag since 1965.' },
      ],
      medium: [
        { prompt: 'What is the capital city of Australia?', options: ['Sydney', 'Melbourne', 'Canberra', 'Perth'], answer: 'Canberra', note: 'Canberra was chosen as a compromise between Sydney and Melbourne.' },
        { prompt: 'Who wrote Pride and Prejudice?', options: ['Charlotte Brontë', 'Jane Austen', 'Mary Shelley', 'George Eliot'], answer: 'Jane Austen', note: 'Jane Austen published the novel in 1813.' },
        { prompt: 'What is the currency of Japan?', options: ['Won', 'Yuan', 'Yen', 'Ringgit'], answer: 'Yen', note: 'The yen is abbreviated JPY.' },
        { prompt: 'What is the name of the line at 0 degrees longitude?', options: ['Equator', 'Prime Meridian', 'Tropic of Cancer', 'International Date Line'], answer: 'Prime Meridian', note: 'The Prime Meridian runs through Greenwich and marks zero degrees longitude.' },
      ],
      hard: [
        { prompt: 'Where were the first modern Olympic Games held in 1896?', options: ['Paris', 'Athens', 'London', 'Rome'], answer: 'Athens', note: 'Athens hosted the first modern Olympics, reviving the ancient Greek tradition.' },
        { prompt: 'How many chemical elements are currently recognized?', options: ['108', '112', '118', '120'], answer: '118', note: 'Oganesson is the 118th and currently last named element.' },
        { prompt: 'What is the deepest known ocean trench?', options: ['Tonga Trench', 'Java Trench', 'Mariana Trench', 'Puerto Rico Trench'], answer: 'Mariana Trench', note: 'The Mariana Trench reaches nearly 11 kilometres below sea level.' },
        { prompt: 'Which city is home to the United Nations headquarters?', options: ['Geneva', 'New York City', 'Paris', 'The Hague'], answer: 'New York City', note: 'The UN headquarters complex is in New York City.' },
      ],
    },
  },
  {
    id: 'science',
    name: 'Science',
    description: 'Explore the natural world, space, and how things work.',
    icon: '⚗️',
    color: 'bg-sky-100 text-sky-700',
    levels: {
      easy: [
        { prompt: 'What is the chemical formula for water?', options: ['CO₂', 'H₂O', 'O₂', 'NaCl'], answer: 'H₂O', note: 'A water molecule has two hydrogen atoms and one oxygen atom.' },
        { prompt: 'What kind of object is the Sun?', options: ['Planet', 'Moon', 'Star', 'Comet'], answer: 'Star', note: 'The Sun is the star at the center of our solar system.' },
        { prompt: 'What process allows plants to use sunlight to make food?', options: ['Photosynthesis', 'Fermentation', 'Digestion', 'Evaporation'], answer: 'Photosynthesis', note: 'Photosynthesis converts light energy into stored chemical energy.' },
        { prompt: 'At what temperature does pure water freeze on the Celsius scale?', options: ['0°C', '10°C', '32°C', '100°C'], answer: '0°C', note: 'At standard atmospheric pressure, water freezes at zero degrees Celsius.' },
      ],
      medium: [
        { prompt: 'Which cell structure is often called the powerhouse of the cell?', options: ['Nucleus', 'Mitochondrion', 'Ribosome', 'Membrane'], answer: 'Mitochondrion', note: 'Mitochondria produce much of the energy cells use.' },
        { prompt: 'Approximately how fast does light travel in a vacuum?', options: ['30,000 km/s', '150,000 km/s', '300,000 km/s', '1,000,000 km/s'], answer: '300,000 km/s', note: 'Light travels at about 299,792 kilometres per second.' },
        { prompt: 'What pH value is neutral at room temperature?', options: ['0', '5', '7', '14'], answer: '7', note: 'A pH of 7 is neutral; lower is acidic and higher is alkaline.' },
        { prompt: 'Which gas do plants absorb from the air during photosynthesis?', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Hydrogen'], answer: 'Carbon dioxide', note: 'Plants use carbon dioxide and water to make sugars during photosynthesis.' },
      ],
      hard: [
        { prompt: 'What is the atomic number of carbon?', options: ['4', '6', '8', '12'], answer: '6', note: 'A carbon atom has six protons in its nucleus.' },
        { prompt: 'What is the shape of a typical DNA molecule?', options: ['Single spiral', 'Double helix', 'Flat sheet', 'Triple ring'], answer: 'Double helix', note: 'DNA is formed from two strands twisted into a double helix.' },
        { prompt: 'Which equation describes Newton’s second law of motion?', options: ['E = mc²', 'F = ma', 'V = IR', 'P = IV'], answer: 'F = ma', note: 'Force equals mass multiplied by acceleration.' },
        { prompt: 'What is the SI unit of electrical resistance?', options: ['Volt', 'Ampere', 'Ohm', 'Watt'], answer: 'Ohm', note: 'Electrical resistance is measured in ohms, symbolized by Ω.' },
      ],
    },
  },
  {
    id: 'maths',
    name: 'Maths',
    description: 'Put your number skills and problem-solving to work.',
    icon: '➗',
    color: 'bg-amber-100 text-amber-700',
    levels: {
      easy: [
        { prompt: 'What is 7 × 8?', options: ['48', '54', '56', '64'], answer: '56', note: 'Seven groups of eight make fifty-six.' },
        { prompt: 'What percentage is equal to one half?', options: ['25%', '40%', '50%', '75%'], answer: '50%', note: 'One half is 0.5, which is 50 percent.' },
        { prompt: 'What is the perimeter of a square with 4 cm sides?', options: ['8 cm', '12 cm', '16 cm', '20 cm'], answer: '16 cm', note: 'A square has four equal sides, so 4 × 4 cm = 16 cm.' },
        { prompt: 'What is 9 × 6?', options: ['45', '52', '54', '63'], answer: '54', note: 'Nine groups of six make fifty-four.' },
      ],
      medium: [
        { prompt: 'What is the square root of 144?', options: ['10', '11', '12', '14'], answer: '12', note: '12 × 12 = 144.' },
        { prompt: 'What is 15% of 200?', options: ['20', '25', '30', '35'], answer: '30', note: '10% of 200 is 20 and 5% is 10, totaling 30.' },
        { prompt: 'What is 3/4 + 1/8?', options: ['4/12', '5/8', '7/8', '1'], answer: '7/8', note: 'Three quarters is six eighths; six eighths plus one is seven eighths.' },
        { prompt: 'If 3x + 5 = 20, what is x?', options: ['3', '5', '7', '15'], answer: '5', note: 'Subtract 5 from both sides, then divide 15 by 3.' },
      ],
      hard: [
        { prompt: 'What are the roots of x² − 5x + 6 = 0?', options: ['1 and 6', '2 and 3', '−2 and −3', '−1 and −6'], answer: '2 and 3', note: 'The expression factors into (x − 2)(x − 3).' },
        { prompt: 'What is 2⁵?', options: ['16', '25', '32', '64'], answer: '32', note: '2⁵ means multiplying five twos: 2 × 2 × 2 × 2 × 2.' },
        { prompt: 'What is the sum of the interior angles of a triangle?', options: ['90°', '180°', '270°', '360°'], answer: '180°', note: 'The interior angles of every Euclidean triangle add up to 180 degrees.' },
        { prompt: 'Which equation is the Pythagorean theorem for a right triangle?', options: ['a + b = c', 'a² + b² = c²', 'a × b = c²', 'a² − b² = c'], answer: 'a² + b² = c²', note: 'For a right triangle, the squares of the two shorter sides sum to the square of the hypotenuse.' },
      ],
    },
  },
  {
    id: 'technology',
    name: 'Technology',
    description: 'Discover the devices and ideas shaping our digital lives.',
    icon: '💻',
    color: 'bg-orange-100 text-orange-700',
    levels: {
      easy: [
        { prompt: 'What does CPU stand for?', options: ['Central Processing Unit', 'Computer Power Utility', 'Core Program Upload', 'Central Program User'], answer: 'Central Processing Unit', note: 'The CPU executes instructions and coordinates computer operations.' },
        { prompt: 'What is HTML mainly used to create?', options: ['Web page structure', 'Photo filters', 'Computer chips', 'Sound effects'], answer: 'Web page structure', note: 'HTML provides the structure and content of web pages.' },
        { prompt: 'Which is an input device?', options: ['Monitor', 'Speaker', 'Keyboard', 'Projector'], answer: 'Keyboard', note: 'A keyboard sends typed input to a computer.' },
        { prompt: 'Which device is commonly used to store files long-term in a computer?', options: ['SSD', 'CPU', 'RAM', 'GPU'], answer: 'SSD', note: 'A solid-state drive stores data even when the computer is turned off.' },
      ],
      medium: [
        { prompt: 'What does URL stand for?', options: ['Universal Record Link', 'Uniform Resource Locator', 'Unified Routing Language', 'User Reference List'], answer: 'Uniform Resource Locator', note: 'A URL is the address used to locate a resource on the web.' },
        { prompt: 'What happens to the contents of typical RAM when power is turned off?', options: ['They are archived', 'They are erased', 'They move to the CPU', 'They become read-only'], answer: 'They are erased', note: 'RAM is volatile memory and needs power to retain its contents.' },
        { prompt: 'How many bits are in one byte?', options: ['4', '8', '16', '32'], answer: '8', note: 'A byte is made up of eight bits.' },
        { prompt: 'What does an HTTP 404 response usually mean?', options: ['The page was not found', 'The server is overheating', 'The request succeeded', 'The internet is disconnected'], answer: 'The page was not found', note: 'A 404 status indicates that the requested resource could not be found.' },
      ],
      hard: [
        { prompt: 'What does DNS primarily translate?', options: ['Domain names to IP addresses', 'Images to text', 'Files to folders', 'Passwords to usernames'], answer: 'Domain names to IP addresses', note: 'DNS helps browsers find the server associated with a domain name.' },
        { prompt: 'In symmetric encryption, how many shared keys are used to encrypt and decrypt?', options: ['One', 'Two', 'Three', 'None'], answer: 'One', note: 'The same secret key is used for both encryption and decryption.' },
        { prompt: 'What is a key characteristic of open-source software?', options: ['It only works offline', 'Its source code can be inspected', 'It has no license', 'It cannot be changed'], answer: 'Its source code can be inspected', note: 'Open-source licenses allow people to inspect and often modify the source.' },
        { prompt: 'What is an API primarily used for?', options: ['Letting software systems communicate', 'Cooling a processor', 'Compressing a screen', 'Charging a battery'], answer: 'Letting software systems communicate', note: 'An API defines how different software components can request and exchange information.' },
      ],
    },
  },
  {
    id: 'history',
    name: 'History',
    description: 'Travel through the events and people that shaped our world.',
    icon: '🏛️',
    color: 'bg-rose-100 text-rose-700',
    levels: {
      easy: [
        { prompt: 'The ancient pyramids at Giza were built in which civilization?', options: ['Roman', 'Ancient Egyptian', 'Mayan', 'Persian'], answer: 'Ancient Egyptian', note: 'The Giza pyramids were built as royal tombs in ancient Egypt.' },
        { prompt: 'In what year was the United States Declaration of Independence adopted?', options: ['1492', '1776', '1812', '1865'], answer: '1776', note: 'The Declaration was adopted on July 4, 1776.' },
        { prompt: 'In what year did the Titanic sink?', options: ['1905', '1912', '1918', '1923'], answer: '1912', note: 'The Titanic sank in the North Atlantic in April 1912.' },
        { prompt: 'The ancient city of Rome is in which present-day country?', options: ['Greece', 'Italy', 'Spain', 'Turkey'], answer: 'Italy', note: 'Rome is the capital city of modern-day Italy.' },
      ],
      medium: [
        { prompt: 'In what year was the Magna Carta agreed?', options: ['1066', '1215', '1492', '1649'], answer: '1215', note: 'King John sealed the Magna Carta in 1215.' },
        { prompt: 'In what year did the Berlin Wall fall?', options: ['1961', '1975', '1989', '1991'], answer: '1989', note: 'The opening of the Berlin Wall in November 1989 became a symbol of change in Europe.' },
        { prompt: 'Who became the first Roman emperor?', options: ['Julius Caesar', 'Augustus', 'Nero', 'Constantine'], answer: 'Augustus', note: 'Augustus became Rome’s first emperor in 27 BCE.' },
        { prompt: 'Who was the first woman to fly solo across the Atlantic Ocean?', options: ['Bessie Coleman', 'Amelia Earhart', 'Harriet Quimby', 'Valentina Tereshkova'], answer: 'Amelia Earhart', note: 'Amelia Earhart completed her solo transatlantic flight in 1932.' },
      ],
      hard: [
        { prompt: 'In what year did the French Revolution begin?', options: ['1688', '1776', '1789', '1815'], answer: '1789', note: 'The French Revolution began in 1789, a period of major political change.' },
        { prompt: 'The historic Silk Road primarily connected China with which region?', options: ['Northern Europe', 'The Mediterranean world', 'Southern Africa', 'The Pacific islands'], answer: 'The Mediterranean world', note: 'Silk Road routes linked East Asia with Central Asia and the Mediterranean.' },
        { prompt: 'Which treaty formally ended the state of war between Germany and the Allied Powers after World War I?', options: ['Treaty of Paris', 'Treaty of Versailles', 'Treaty of Utrecht', 'Treaty of Tordesillas'], answer: 'Treaty of Versailles', note: 'The Treaty of Versailles was signed in 1919.' },
        { prompt: 'In what year did Ottoman forces capture Constantinople?', options: ['1204', '1299', '1453', '1492'], answer: '1453', note: 'Constantinople fell to the Ottoman Empire in 1453.' },
      ],
    },
  },
  {
    id: 'sports',
    name: 'Sports',
    description: 'Test your knowledge of games, records, and big moments.',
    icon: '🏆',
    color: 'bg-lime-100 text-lime-700',
    levels: {
      easy: [
        { prompt: 'How many players from one team are on the field in association football?', options: ['9', '10', '11', '12'], answer: '11', note: 'A standard football team has eleven players on the pitch.' },
        { prompt: 'In tennis scoring, what does “love” mean?', options: ['One point', 'Zero points', 'A tie break', 'A match point'], answer: 'Zero points', note: 'Tennis uses “love” to mean a score of zero.' },
        { prompt: 'How many points is a regular field goal worth in basketball?', options: ['1', '2', '3', '4'], answer: '2', note: 'A field goal inside the three-point line scores two points.' },
        { prompt: 'Which sport uses a puck during play?', options: ['Field hockey', 'Ice hockey', 'Lacrosse', 'Curling'], answer: 'Ice hockey', note: 'Ice hockey players use sticks to move a puck across the rink.' },
      ],
      medium: [
        { prompt: 'How long is an official marathon?', options: ['40 km', '41.2 km', '42.195 km', '45 km'], answer: '42.195 km', note: 'The official marathon distance is 42.195 kilometres.' },
        { prompt: 'What is the traditional playing surface at Wimbledon?', options: ['Clay', 'Hard court', 'Grass', 'Carpet'], answer: 'Grass', note: 'Wimbledon is the only Grand Slam played on grass.' },
        { prompt: 'How often are the Summer Olympic Games normally held?', options: ['Every 2 years', 'Every 3 years', 'Every 4 years', 'Every 5 years'], answer: 'Every 4 years', note: 'The Summer Olympics are held every four years.' },
        { prompt: 'Which country won the 2018 men’s FIFA World Cup?', options: ['Croatia', 'Brazil', 'France', 'Germany'], answer: 'France', note: 'France defeated Croatia in the 2018 World Cup final.' },
      ],
      hard: [
        { prompt: 'Which sport is the Tour de France associated with?', options: ['Motor racing', 'Cycling', 'Running', 'Sailing'], answer: 'Cycling', note: 'The Tour de France is a multi-stage professional road cycling race.' },
        { prompt: 'How long can a standard men’s international cricket Test match last?', options: ['One day', 'Three days', 'Up to five days', 'Two weeks'], answer: 'Up to five days', note: 'Test cricket is scheduled for up to five days of play.' },
        { prompt: 'In which sport would you perform a Fosbury Flop?', options: ['Pole vault', 'High jump', 'Long jump', 'Gymnastics'], answer: 'High jump', note: 'The Fosbury Flop is a back-first technique used in the high jump.' },
        { prompt: 'In tennis, what is commonly played when a set reaches 6–6?', options: ['A penalty shootout', 'A tiebreak', 'A replay', 'A sudden-death serve'], answer: 'A tiebreak', note: 'Most tennis sets use a tiebreak at 6–6 to decide the set.' },
      ],
    },
  },
  {
    id: 'programming',
    name: 'Programming',
    description: 'From coding basics to the concepts behind great software.',
    icon: '⌘',
    color: 'bg-teal-100 text-teal-700',
    levels: {
      easy: [
        { prompt: 'Which HTML tag is used to create a hyperlink?', options: ['<p>', '<a>', '<img>', '<h1>'], answer: '<a>', note: 'The anchor element, written as <a>, creates links.' },
        { prompt: 'Which data structure stores an ordered list of items in JavaScript?', options: ['Array', 'Boolean', 'Function', 'Comment'], answer: 'Array', note: 'JavaScript arrays store ordered collections of values.' },
        { prompt: 'Which language is commonly used to style web pages?', options: ['CSS', 'SQL', 'Bash', 'C'], answer: 'CSS', note: 'CSS controls the visual presentation and layout of web pages.' },
        { prompt: 'Which symbol pair starts a single-line comment in JavaScript?', options: ['//', '<!--', '**', '##'], answer: '//', note: 'JavaScript ignores text after // until the end of that line.' },
      ],
      medium: [
        { prompt: 'What does a loop do in a program?', options: ['Repeats a block of instructions', 'Deletes a file', 'Creates a network', 'Styles a page'], answer: 'Repeats a block of instructions', note: 'Loops repeat code while a condition holds or for each item in a collection.' },
        { prompt: 'In JavaScript, what does the === operator compare?', options: ['Only variable names', 'Value and type', 'Only data types', 'Two functions'], answer: 'Value and type', note: 'Strict equality checks both value and type without coercion.' },
        { prompt: 'What is a function parameter?', options: ['An input a function can receive', 'A programming language', 'A saved file', 'A type of loop'], answer: 'An input a function can receive', note: 'Parameters let functions accept values to work with.' },
        { prompt: 'Which JavaScript keyword declares a block-scoped variable that can be reassigned?', options: ['const', 'let', 'static', 'define'], answer: 'let', note: 'A variable declared with let is limited to its block and can be reassigned.' },
      ],
      hard: [
        { prompt: 'What does Big O notation describe?', options: ['Code formatting', 'How resource use scales with input size', 'A programming language version', 'The number of comments'], answer: 'How resource use scales with input size', note: 'Big O describes how an algorithm’s time or space requirements grow.' },
        { prompt: 'What is recursion?', options: ['A function calling itself', 'A variable without a value', 'A sorting format', 'A network request'], answer: 'A function calling itself', note: 'Recursive functions solve a problem by calling themselves on smaller cases.' },
        { prompt: 'In Git, what does a commit represent?', options: ['A saved snapshot of changes', 'A remote server', 'A code editor', 'A deleted branch'], answer: 'A saved snapshot of changes', note: 'A commit records a snapshot and its metadata in the repository history.' },
        { prompt: 'What is the time complexity of binary search on a sorted list?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], answer: 'O(log n)', note: 'Binary search halves the remaining search range at each step.' },
      ],
    },
  },
  {
    id: 'movies',
    name: 'Movies & entertainment',
    description: 'Lights, camera, questions about the stories we love.',
    icon: '🎬',
    color: 'bg-fuchsia-100 text-fuchsia-700',
    levels: {
      easy: [
        { prompt: 'What is the name of the cowboy in Toy Story?', options: ['Buzz', 'Woody', 'Rex', 'Andy'], answer: 'Woody', note: 'Woody is Andy’s loyal cowboy doll.' },
        { prompt: 'Which movie features a snowman named Olaf?', options: ['Moana', 'Frozen', 'Coco', 'Up'], answer: 'Frozen', note: 'Olaf is the cheerful snowman brought to life in Frozen.' },
        { prompt: 'What do we call the person who directs a film?', options: ['Producer', 'Director', 'Editor', 'Critic'], answer: 'Director', note: 'The director guides the creative and visual storytelling of a film.' },
        { prompt: 'Which character is a sea captain in the animated film Moana?', options: ['Maui', 'Hei Hei', 'Tamatoa', 'Chief Tui'], answer: 'Maui', note: 'Maui is the legendary demigod who joins Moana on her voyage.' },
      ],
      medium: [
        { prompt: 'Which fictional city is Batman most famously associated with?', options: ['Metropolis', 'Gotham City', 'Star City', 'Central City'], answer: 'Gotham City', note: 'Gotham City is Batman’s dark and crime-filled home.' },
        { prompt: 'What is the name of the school in the Harry Potter series?', options: ['Beauxbatons', 'Hogwarts', 'Durmstrang', 'Ilvermorny'], answer: 'Hogwarts', note: 'Hogwarts School of Witchcraft and Wizardry is where Harry studies magic.' },
        { prompt: 'Which actor played Jack in the film Titanic?', options: ['Brad Pitt', 'Leonardo DiCaprio', 'Tom Cruise', 'Matt Damon'], answer: 'Leonardo DiCaprio', note: 'Leonardo DiCaprio played Jack Dawson opposite Kate Winslet.' },
        { prompt: 'Which film series features a time-traveling DeLorean car?', options: ['Ghostbusters', 'Back to the Future', 'Jurassic Park', 'Men in Black'], answer: 'Back to the Future', note: 'Doc Brown converts a DeLorean into a time machine in the film series.' },
      ],
      hard: [
        { prompt: 'Which film won the first Academy Award for Best Picture?', options: ['Wings', 'Sunrise', 'The Jazz Singer', 'Metropolis'], answer: 'Wings', note: 'Wings won the award at the first Academy Awards ceremony in 1929.' },
        { prompt: 'In The Lord of the Rings, what is the name of the elf played by Orlando Bloom?', options: ['Elrond', 'Legolas', 'Aragorn', 'Frodo'], answer: 'Legolas', note: 'Legolas is the elven archer in the Fellowship of the Ring.' },
        { prompt: 'Which director made the film Spirited Away?', options: ['Satoshi Kon', 'Hayao Miyazaki', 'Makoto Shinkai', 'Mamoru Hosoda'], answer: 'Hayao Miyazaki', note: 'Hayao Miyazaki directed the acclaimed Studio Ghibli film.' },
        { prompt: 'Who directed the influential Japanese film Seven Samurai?', options: ['Akira Kurosawa', 'Yasujirō Ozu', 'Kenji Mizoguchi', 'Takashi Miike'], answer: 'Akira Kurosawa', note: 'Akira Kurosawa directed Seven Samurai, released in 1954.' },
      ],
    },
  },
  {
    id: 'riddles',
    name: 'Riddles & brain teasers',
    description: 'Give your logic a workout with a few clever twists.',
    icon: '🧩',
    color: 'bg-violet-100 text-violet-700',
    levels: {
      easy: [
        { prompt: 'What has hands but cannot clap?', options: ['A clock', 'A glove', 'A statue', 'A robot'], answer: 'A clock', note: 'A clock has hands that point to the time, but they cannot clap.' },
        { prompt: 'What gets wetter the more it dries?', options: ['A sponge', 'A towel', 'Rain', 'A puddle'], answer: 'A towel', note: 'A towel absorbs water while it dries something else.' },
        { prompt: 'What has a face and two hands but no arms or legs?', options: ['A clock', 'A doll', 'A painting', 'A mirror'], answer: 'A clock', note: 'A clock face and hands tell you the time.' },
        { prompt: 'What has one eye but cannot see?', options: ['A needle', 'A storm', 'A potato', 'A camera'], answer: 'A needle', note: 'The eye of a needle is the small hole through which thread passes.' },
      ],
      medium: [
        { prompt: 'A farmer has 17 sheep and all but 9 wander off. How many are left?', options: ['8', '9', '17', '26'], answer: '9', note: '“All but 9” means that 9 sheep remain.' },
        { prompt: 'What can travel around the world while staying in one corner?', options: ['A shadow', 'A stamp', 'A compass', 'A map'], answer: 'A stamp', note: 'A stamp stays in the corner of an envelope as it travels.' },
        { prompt: 'Which number comes next: 2, 3, 5, 8, 12, ...?', options: ['15', '16', '17', '18'], answer: '17', note: 'The gaps grow by one each time: +1, +2, +3, +4, then +5.' },
        { prompt: 'What can speak without a mouth and answer without understanding?', options: ['An echo', 'A book', 'A mirror', 'A shadow'], answer: 'An echo', note: 'An echo repeats sounds without knowing what they mean.' },
      ],
      hard: [
        { prompt: 'You overtake the runner in second place. What place are you in now?', options: ['First', 'Second', 'Third', 'It depends'], answer: 'Second', note: 'You take the place of the runner you passed: second.' },
        { prompt: 'A bat and ball cost $1.10 total. The bat costs $1 more than the ball. What does the ball cost?', options: ['$0.05', '$0.10', '$0.15', '$1.00'], answer: '$0.05', note: 'If the ball costs 5 cents, the bat costs $1.05, totaling $1.10.' },
        { prompt: 'How many times can you subtract 10 from 100?', options: ['Once', 'Twice', 'Ten times', 'Nine times'], answer: 'Once', note: 'After the first subtraction, you are subtracting from 90, not 100.' },
        { prompt: 'Three boxes are labeled apples, oranges, and mixed, but every label is wrong. Which box should you sample first to identify all three?', options: ['The box labeled apples', 'The box labeled oranges', 'The box labeled mixed', 'Any box; labels reveal nothing'], answer: 'The box labeled mixed', note: 'Since that label is wrong, the box contains only one fruit type; that sample lets you deduce the other two boxes.' },
      ],
    },
  },
  {
    id: 'music',
    name: 'Music & pop culture',
    description: 'Tune in to chart hits, famous faces, and cultural moments.',
    icon: '🎤',
    color: 'bg-pink-100 text-pink-700',
    levels: {
      easy: [
        { prompt: 'Which instrument has black and white keys?', options: ['Piano', 'Trumpet', 'Drum', 'Flute'], answer: 'Piano', note: 'A piano uses keys to play notes across a wide range.' },
        { prompt: 'How many strings does a standard guitar usually have?', options: ['Four', 'Five', 'Six', 'Eight'], answer: 'Six', note: 'Most standard guitars have six strings.' },
        { prompt: 'What do we call a group of people singing together?', options: ['An orchestra', 'A choir', 'A cast', 'A crowd'], answer: 'A choir', note: 'A choir is a group of singers performing together.' },
        { prompt: 'How many beats are in one bar of music written in 4/4 time?', options: ['Two', 'Three', 'Four', 'Eight'], answer: 'Four', note: 'The top number in 4/4 indicates four beats in each bar.' },
      ],
      medium: [
        { prompt: 'Which singer is known as the “King of Pop”?', options: ['Elvis Presley', 'Michael Jackson', 'Prince', 'Stevie Wonder'], answer: 'Michael Jackson', note: 'Michael Jackson earned the famous nickname for his impact on pop music.' },
        { prompt: 'Which band released the album Abbey Road?', options: ['The Rolling Stones', 'Queen', 'The Beatles', 'The Who'], answer: 'The Beatles', note: 'The Beatles released Abbey Road in 1969.' },
        { prompt: 'What is the highest common female singing voice?', options: ['Alto', 'Tenor', 'Soprano', 'Baritone'], answer: 'Soprano', note: 'Soprano is the highest standard vocal range.' },
        { prompt: 'Which singer released the album titled 1989?', options: ['Katy Perry', 'Taylor Swift', 'Lady Gaga', 'Miley Cyrus'], answer: 'Taylor Swift', note: 'Taylor Swift released her pop album 1989 in 2014.' },
      ],
      hard: [
        { prompt: 'Which composer wrote the Four Seasons violin concertos?', options: ['Vivaldi', 'Bach', 'Mozart', 'Handel'], answer: 'Vivaldi', note: 'Antonio Vivaldi composed The Four Seasons in the early 18th century.' },
        { prompt: 'Which artist released the album Lemonade in 2016?', options: ['Rihanna', 'Beyoncé', 'Adele', 'Sia'], answer: 'Beyoncé', note: 'Beyoncé released the acclaimed visual album Lemonade in 2016.' },
        { prompt: 'In music, how many semitones are in an octave?', options: ['8', '10', '12', '14'], answer: '12', note: 'A standard octave spans twelve semitones.' },
        { prompt: 'Who composed the ballet The Rite of Spring?', options: ['Claude Debussy', 'Igor Stravinsky', 'Pyotr Tchaikovsky', 'Sergei Rachmaninoff'], answer: 'Igor Stravinsky', note: 'Igor Stravinsky composed The Rite of Spring, which premiered in 1913.' },
      ],
    },
  },
  {
    id: 'mystery',
    name: 'Mystery question',
    description: 'A surprise mix of curious facts—expect the unexpected.',
    icon: '🔮',
    color: 'bg-indigo-100 text-indigo-700',
    levels: {
      easy: [
        { prompt: 'Which animal is famous for changing its color to blend in?', options: ['Chameleon', 'Elephant', 'Penguin', 'Giraffe'], answer: 'Chameleon', note: 'Some chameleons change color for communication and camouflage.' },
        { prompt: 'What is the only mammal capable of true flight?', options: ['Flying squirrel', 'Bat', 'Sugar glider', 'Colugo'], answer: 'Bat', note: 'Bats are the only mammals capable of sustained powered flight.' },
        { prompt: 'Which fruit has its seeds on the outside?', options: ['Apple', 'Strawberry', 'Peach', 'Grape'], answer: 'Strawberry', note: 'The tiny dots on a strawberry’s outside are its individual fruits, each containing a seed.' },
        { prompt: 'What is the largest animal on Earth?', options: ['African elephant', 'Blue whale', 'Giraffe', 'Whale shark'], answer: 'Blue whale', note: 'The blue whale is the largest known animal to have ever lived.' },
      ],
      medium: [
        { prompt: 'What is the smallest country in the world by area?', options: ['Monaco', 'San Marino', 'Vatican City', 'Liechtenstein'], answer: 'Vatican City', note: 'Vatican City covers about 0.49 square kilometres.' },
        { prompt: 'Which planet rotates on its side?', options: ['Mars', 'Uranus', 'Mercury', 'Saturn'], answer: 'Uranus', note: 'Uranus has an extreme axial tilt of about 98 degrees.' },
        { prompt: 'What is the name for a word that reads the same backward and forward?', options: ['Anagram', 'Palindrome', 'Acronym', 'Homonym'], answer: 'Palindrome', note: '“Level” is a palindrome because it reads the same in both directions.' },
        { prompt: 'Which gas makes up most of Earth’s atmosphere?', options: ['Oxygen', 'Carbon dioxide', 'Nitrogen', 'Argon'], answer: 'Nitrogen', note: 'Nitrogen makes up about 78 percent of Earth’s atmosphere.' },
      ],
      hard: [
        { prompt: 'Which sea has no coastline and is defined by ocean currents?', options: ['Coral Sea', 'Sargasso Sea', 'Red Sea', 'Arabian Sea'], answer: 'Sargasso Sea', note: 'The Sargasso Sea is bounded by currents in the North Atlantic.' },
        { prompt: 'What is the fear of long words humorously called?', options: ['Hippopotomonstrosesquipedaliophobia', 'Somniphobia', 'Chronophobia', 'Ablutophobia'], answer: 'Hippopotomonstrosesquipedaliophobia', note: 'The famously long name is often used as a joke about fear of long words.' },
        { prompt: 'Which element has the chemical symbol W?', options: ['Tungsten', 'Tin', 'Tantalum', 'Titanium'], answer: 'Tungsten', note: 'W comes from wolfram, another name for tungsten.' },
        { prompt: 'What is the largest moon in our solar system?', options: ['Titan', 'Europa', 'Ganymede', 'Earth’s Moon'], answer: 'Ganymede', note: 'Jupiter’s moon Ganymede is larger than the planet Mercury.' },
      ],
    },
  },
]

const wheelCategoryIds = ['general', 'science', 'history', 'movies', 'sports', 'riddles', 'music', 'mystery']
const wheelChallenges = [
  'Speed round: trust your first answer before your imaginary buzzer goes off!',
  'No second-guessing! Your first instinct is the captain now.',
  'Bonus brain points for dramatic thinking-face expressions.',
  'Say “I meant to do that” with confidence after every answer.',
  'Quiz wizard mode: answer like your brain has a tiny graduation cap.',
]
const wheelStartMessages = [
  'Hold onto your snacks—the quiz-cyclone is taking off!',
  'Spinning up some brain-powered chaos. Wheee!',
  'The wheel is choosing your fate... no bribing the pointer!',
]
const wheelStopMessages = [
  'The wheel has spoken. Your brain has been summoned!',
  'Plot twist! Your next adventure has arrived.',
  'A wild quiz challenge appears. You’ve got this!',
  'The wheel picked you. Try not to look suspiciously smart.',
]
const QUESTION_TIME_LIMIT = 15

let quizAudioContext

function prepareQuizAudio(enabled) {
  if (!enabled || typeof window === 'undefined') return null
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass) return null

  quizAudioContext ??= new AudioContextClass()
  if (quizAudioContext.state === 'suspended') quizAudioContext.resume()
  return quizAudioContext
}

function playQuizSound(effect, enabled) {
  const context = prepareQuizAudio(enabled)
  if (!context) return

  const sounds = {
    select: [{ frequency: 740, time: 0, duration: 0.07, waveform: 'sine', volume: 0.07 }],
    correct: [
      { frequency: 523, time: 0.11, duration: 0.14, waveform: 'triangle', volume: 0.1 },
      { frequency: 659, time: 0.22, duration: 0.15, waveform: 'triangle', volume: 0.1 },
      { frequency: 784, time: 0.33, duration: 0.2, waveform: 'triangle', volume: 0.1 },
    ],
    wrong: [
      { frequency: 190, time: 0.11, duration: 0.16, waveform: 'triangle', volume: 0.055 },
      { frequency: 145, time: 0.24, duration: 0.18, waveform: 'triangle', volume: 0.045 },
    ],
    warning: [{ frequency: 880, time: 0, duration: 0.07, waveform: 'square', volume: 0.035 }],
    victory: [
      { frequency: 523, time: 0, duration: 0.18, waveform: 'triangle', volume: 0.1 },
      { frequency: 659, time: 0.12, duration: 0.18, waveform: 'triangle', volume: 0.1 },
      { frequency: 784, time: 0.24, duration: 0.18, waveform: 'triangle', volume: 0.1 },
      { frequency: 1047, time: 0.36, duration: 0.2, waveform: 'triangle', volume: 0.1 },
      { frequency: 1319, time: 0.5, duration: 0.3, waveform: 'triangle', volume: 0.1 },
    ],
  }

  sounds[effect].forEach(({ frequency, time, duration, waveform, volume }) => {
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    const startAt = context.currentTime + time
    oscillator.type = waveform
    oscillator.frequency.value = frequency
    gain.gain.setValueAtTime(0.0001, startAt)
    gain.gain.exponentialRampToValueAtTime(volume, startAt + 0.015)
    gain.gain.exponentialRampToValueAtTime(0.0001, startAt + duration)
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start(startAt)
    oscillator.stop(startAt + duration)
  })
}

function Sparkle({ className = '' }) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        d="M12 2.5 14.6 9.4 21.5 12l-6.9 2.6L12 21.5l-2.6-6.9L2.5 12l6.9-2.6L12 2.5Z"
        fill="currentColor"
      />
    </svg>
  )
}

function Brand({ onClick }) {
  return (
    <button
      aria-label="Brainbox dashboard"
      className="flex items-center gap-2.5 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
      onClick={onClick}
      type="button"
    >
      <img alt="" className="size-10 rounded-xl shadow-lg shadow-orange-200" height="40" src="/brainbox.svg" width="40" />
      <span className="text-lg font-bold tracking-tight text-slate-900">Brainbox</span>
    </button>
  )
}

function Progress({ current, total }) {
  const progress = (current / total) * 100

  return (
    <div className="mb-9">
      <div className="mb-3 flex items-center justify-between text-sm">
        <span className="font-medium text-slate-500">Your progress</span>
        <span className="font-semibold text-slate-900">
          {String(current).padStart(2, '0')}
          <span className="text-slate-400"> / {String(total).padStart(2, '0')}</span>
        </span>
      </div>
      <div
        aria-label={`Question ${current} of ${total}`}
        aria-valuemax={total}
        aria-valuemin={0}
        aria-valuenow={current}
        className="h-2 overflow-hidden rounded-full bg-slate-200"
        role="progressbar"
      >
        <div
          className="h-full rounded-full bg-orange-500 transition-[width] duration-500"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  )
}

function playWheelSound(kind) {
  const AudioContextClass = window.AudioContext || window.webkitAudioContext
  if (!AudioContextClass) return

  const context = new AudioContextClass()
  const notes = kind === 'spin'
    ? [{ frequency: 392, time: 0 }, { frequency: 523, time: 0.13 }, { frequency: 659, time: 0.26 }]
    : [{ frequency: 523, time: 0 }, { frequency: 659, time: 0.12 }, { frequency: 784, time: 0.24 }, { frequency: 1047, time: 0.36 }]

  notes.forEach(({ frequency, time }) => {
    const oscillator = context.createOscillator()
    const gain = context.createGain()
    oscillator.type = 'triangle'
    oscillator.frequency.value = frequency
    gain.gain.setValueAtTime(0.0001, context.currentTime + time)
    gain.gain.exponentialRampToValueAtTime(0.12, context.currentTime + time + 0.02)
    gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + time + 0.16)
    oscillator.connect(gain)
    gain.connect(context.destination)
    oscillator.start(context.currentTime + time)
    oscillator.stop(context.currentTime + time + 0.17)
  })

  window.setTimeout(() => context.close(), 1000)
}

function CategoryWheel({ onSelectCategory }) {
  const [rotation, setRotation] = useState(0)
  const [spinning, setSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const [announcement, setAnnouncement] = useState('Give the wheel a spin to reveal your next quiz adventure.')
  const wheelCategories = wheelCategoryIds.map((id) => categories.find((category) => category.id === id))
  const wheelColors = ['#fb7185', '#fbbf24', '#34d399', '#38bdf8', '#818cf8', '#c084fc', '#f472b6', '#fb923c']
  const wheelBackground = `conic-gradient(${wheelColors.map((color, index) => {
    const start = index * 45
    return `${color} ${start}deg ${start + 45}deg`
  }).join(', ')})`
  const labels = ['General', 'Science', 'History', 'Movies', 'Sports', 'Riddles', 'Music', 'Mystery']

  function spinWheel() {
    if (spinning) return

    const categoryIndex = Math.floor(Math.random() * wheelCategories.length)
    const challenge = wheelChallenges[Math.floor(Math.random() * wheelChallenges.length)]
    const category = wheelCategories[categoryIndex]
    const targetRotation = (360 - ((categoryIndex * 45 + 22.5) % 360)) % 360
    const extraRotation = (targetRotation - (rotation % 360) + 360) % 360
    const nextRotation = rotation + 6 * 360 + extraRotation
    const startMessage = wheelStartMessages[Math.floor(Math.random() * wheelStartMessages.length)]
    const stopMessage = wheelStopMessages[Math.floor(Math.random() * wheelStopMessages.length)]
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const duration = prefersReducedMotion ? 60 : 4800

    setSpinning(true)
    setResult(null)
    setAnnouncement(startMessage)
    playWheelSound('spin')
    setRotation(nextRotation)
    window.setTimeout(() => {
      setSpinning(false)
      setResult({ category, challenge })
      setAnnouncement(`${stopMessage} ${category.name} is up next! Surprise challenge: ${challenge}`)
      playWheelSound('stop')
    }, duration)
  }

  return (
    <section aria-labelledby="wheel-title" className="animate-fade-up-delay relative mb-8 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-indigo-950 via-violet-950 to-fuchsia-950 p-6 text-white shadow-xl shadow-violet-200/70 sm:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="relative z-10 grid items-center gap-8 md:grid-cols-[minmax(280px,0.9fr)_1.1fr]">
        <div className="flex flex-col items-center">
          <div className="relative mb-5 size-[min(76vw,310px)]">
            <div aria-hidden="true" className="wheel-pointer absolute left-1/2 top-[-7px] z-20 -translate-x-1/2" />
            <div
              aria-label="Eight colorful quiz categories"
              className="wheel-disc absolute inset-0 rounded-full border-[9px] border-white/90 shadow-[0_0_38px_rgba(217,70,239,0.45)]"
              role="img"
              style={{ background: wheelBackground, transform: `rotate(${rotation}deg)` }}
            >
              {labels.map((label, index) => (
                <span
                  className="wheel-label"
                  key={label}
                  style={{ transform: `translate(-50%, -50%) rotate(${index * 45 + 22.5}deg) translateY(-112px) rotate(-${index * 45 + 22.5}deg)` }}
                >
                  {label}
                </span>
              ))}
              <span aria-hidden="true" className="wheel-hub">✦</span>
            </div>
          </div>
          <button
            className="spin-button inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-amber-300 via-pink-400 to-fuchsia-400 px-8 py-3 text-sm font-black tracking-[0.1em] text-indigo-950 shadow-[0_0_24px_rgba(244,114,182,0.48)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_0_34px_rgba(244,114,182,0.72)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white disabled:cursor-wait disabled:opacity-75"
            disabled={spinning}
            onClick={spinWheel}
            type="button"
          >
            <span aria-hidden="true">{spinning ? '✧' : '⟳'}</span>
            {spinning ? 'SPINNING...' : 'SPIN THE WHEEL'}
          </button>
        </div>

        <div className="max-w-xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-bold tracking-[0.14em] text-fuchsia-100">
            <Sparkle className="size-3.5" /> THE ADVENTURE WHEEL
          </p>
          <h2 id="wheel-title" className="text-2xl font-bold tracking-tight sm:text-3xl">Feeling lucky, quiz champion?</h2>
          <p className="mt-2 max-w-md text-sm leading-6 text-violet-100">
            Spin for a surprise category and a silly bonus challenge. No two adventures have to feel the same!
          </p>
          <p aria-live="polite" className="mt-4 min-h-6 text-sm font-semibold text-amber-200">
            {announcement}
          </p>
          {result ? (
            <div className="mt-5 rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm animate-fade-up">
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white/15 text-2xl">{result.category.icon}</span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-fuchsia-200">Your category</p>
                  <p className="font-bold text-white">{result.category.name}</p>
                </div>
              </div>
              <p className="mt-3 text-sm leading-5 text-violet-100"><span className="font-bold text-amber-200">Surprise challenge:</span> {result.challenge}</p>
              <button
                className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-xl bg-white px-4 py-2 text-sm font-bold text-indigo-950 transition hover:bg-amber-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
                onClick={() => onSelectCategory(result.category.id, result.challenge)}
                type="button"
              >
                Take this challenge <span aria-hidden="true">→</span>
              </button>
            </div>
          ) : (
            <p className="mt-5 text-xs font-medium text-violet-200">Eight categories. One spin. Absolutely no wheel bribery.</p>
          )}
        </div>
      </div>
    </section>
  )
}

function Dashboard({ bestScore, activities, onSelectCategory, onStart, onWheelSelect }) {
  const questionCount = categories.reduce(
    (total, category) =>
      total + Object.values(category.levels).reduce((sum, questionsForLevel) => sum + questionsForLevel.length, 0),
    0,
  )
  const maxPoints = Math.max(...categories.flatMap((category) =>
    levels.map((level) => category.levels[level.id].length * level.points),
  ))

  return (
    <main className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-12 pt-9 sm:px-8 lg:pt-12">
      <section id="overview" className="animate-fade-up mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm font-medium text-orange-700">YOUR PERSONAL QUIZ ARENA</p>
          <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Your brain is your superpower!
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Complete challenges, earn points, beat your score, and become a quiz champion.
          </p>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3.5 py-2 text-xs font-semibold text-orange-700 shadow-sm">
          <Sparkle className="size-3.5" />
          Your next challenge is ready
        </div>
      </section>

      <section className="animate-fade-up-delay relative mb-6 overflow-hidden rounded-[1.75rem] bg-gradient-to-br from-orange-500 via-orange-600 to-rose-500 px-6 py-8 text-white shadow-xl shadow-orange-200/70 sm:px-9 sm:py-10">
        <div aria-hidden="true" className="pointer-events-none absolute -right-14 -top-32 size-80 rounded-full border border-white/10 bg-white/[0.06]" />
        <div aria-hidden="true" className="pointer-events-none absolute right-28 top-24 size-44 rounded-full border border-white/10" />
        <div className="relative z-10 grid items-center gap-8 md:grid-cols-[1fr_auto]">
          <div className="max-w-xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-[11px] font-semibold tracking-[0.12em] text-orange-50">
              <Sparkle className="size-3.5" /> YOUR DAILY BRAIN BOOST
            </div>
            <h2 className="text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
              Ready to rise to the challenge?
            </h2>
            <p className="mt-3 max-w-md text-sm leading-6 text-orange-50 sm:text-base">
              Pick a category and difficulty. Every right answer brings you closer to your personal best.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4">
            <button
              className="group inline-flex min-h-11 items-center justify-center gap-3 rounded-xl bg-white px-5 py-2.5 text-sm font-bold text-orange-800 shadow-lg shadow-orange-900/10 transition duration-200 hover:-translate-y-0.5 hover:bg-orange-50 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white"
              onClick={() => onStart()}
              type="button"
            >
              Choose your challenge
              <span aria-hidden="true" className="transition-transform duration-200 group-hover:translate-x-1">
                →
              </span>
            </button>
              <span className="text-sm text-orange-50">{categories.length} categories · 3 difficulty levels</span>
            </div>
          </div>
          <div aria-hidden="true" className="relative hidden h-40 w-44 md:block">
            <div className="absolute right-2 top-1 grid size-32 rotate-6 place-items-center rounded-[2rem] border border-white/20 bg-white/10 shadow-2xl backdrop-blur-sm">
              <div className="grid size-20 place-items-center rounded-[1.4rem] bg-white text-4xl text-orange-600 shadow-lg">✦</div>
            </div>
            <div className="absolute bottom-1 left-0 rounded-2xl border border-white/25 bg-white/15 px-4 py-3 shadow-lg backdrop-blur-md">
              <p className="text-[10px] font-semibold tracking-widest text-orange-50">YOUR NEXT WIN</p>
              <p className="mt-1 text-sm font-bold">Earn up to {maxPoints} points</p>
            </div>
          </div>
        </div>
      </section>

      <CategoryWheel onSelectCategory={onWheelSelect} />

      <section aria-label="Your quiz stats" className="animate-fade-up-delay-2 mb-10 grid gap-4 sm:grid-cols-3">
        <StatCard icon="▦" iconColor="bg-orange-100 text-orange-700" label="Quiz categories" value={categories.length} detail="Something for every curious mind" />
        <StatCard icon="☷" iconColor="bg-amber-100 text-amber-700" label="Questions available" value={questionCount} detail="Across easy, medium, and hard" />
        <StatCard icon="↗" iconColor="bg-rose-100 text-rose-700" label="Your highest score" value={`${bestScore}%`} detail={bestScore ? 'Personal best — keep it up!' : 'Your first best is waiting'} />
      </section>

      <section className="mb-10 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <div id="activity" className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center justify-between">
            <div>
              <h2 className="font-bold text-slate-900">Recent activity</h2>
              <p className="mt-1 text-xs text-slate-500">Your latest quiz sessions</p>
            </div>
            <span className="grid size-9 place-items-center rounded-xl bg-orange-50 text-orange-700">↗</span>
          </div>
          {activities.length ? (
            <ul className="divide-y divide-slate-100">
              {activities.slice(0, 3).map((activity) => (
                <li className="flex items-center gap-3 py-3 first:pt-0 last:pb-0" key={activity.id}>
                  <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700">✓</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-slate-800">{activity.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">{activity.when} · Completed</p>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-bold text-emerald-700">{activity.score}%</span>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex min-h-28 items-center gap-4 rounded-xl bg-slate-50 px-4">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-white text-lg shadow-sm">✧</span>
              <div>
                <p className="text-sm font-semibold text-slate-800">Your story starts here</p>
                <p className="mt-1 text-xs leading-5 text-slate-500">Finish your first quiz and it’ll show up here.</p>
              </div>
            </div>
          )}
        </div>

        <div className="relative overflow-hidden rounded-2xl border border-amber-100 bg-gradient-to-br from-amber-50 via-orange-50 to-white p-5 shadow-sm sm:p-6">
          <div aria-hidden="true" className="absolute -right-10 -top-12 size-40 rounded-full bg-amber-200/30 blur-2xl" />
          <div className="relative">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="font-bold text-slate-900">A little inspiration</h2>
                <p className="mt-1 text-xs text-slate-500">A curious thought for today</p>
              </div>
              <span className="grid size-9 place-items-center rounded-xl bg-white text-amber-600 shadow-sm">✦</span>
            </div>
            <blockquote className="text-lg font-semibold leading-7 tracking-tight text-slate-800">
              “The more that you read, the more things you will know.”
            </blockquote>
            <p className="mt-3 text-sm text-slate-500">— Dr. Seuss</p>
            <div className="mt-5 flex items-center gap-2 text-xs font-medium text-amber-800">
              <span className="size-1.5 rounded-full bg-amber-500" />
              Stay curious. Keep exploring.
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="scroll-mt-6">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs font-semibold tracking-[0.14em] text-orange-700">PICK YOUR NEXT ADVENTURE</p>
            <h2 className="mt-1.5 text-xl font-bold tracking-tight text-slate-900">Choose a quiz category</h2>
          </div>
          <p className="text-sm text-slate-500">Select a category, then choose your level</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const count = Object.values(category.levels).reduce((sum, items) => sum + items.length, 0)
            return (
              <article className="group rounded-2xl border border-slate-200/80 bg-white p-4 shadow-sm transition duration-200 hover:-translate-y-1 hover:border-orange-200 hover:shadow-lg hover:shadow-orange-100/70" key={category.id}>
                <div className={`mb-4 grid size-11 place-items-center rounded-xl text-xl ${category.color}`}>{category.icon}</div>
                <p className="text-sm font-bold text-slate-900">{category.name}</p>
                <p className="mt-1 min-h-10 text-xs leading-5 text-slate-500">{category.description}</p>
                <p className="mt-2 text-xs font-medium text-slate-600">{count} questions · 3 levels</p>
                <button
                  aria-label={`Choose ${category.name}`}
                  className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-orange-700 transition group-hover:gap-2.5 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
                  onClick={() => onSelectCategory(category.id)}
                  type="button"
                >
                  Choose category <span aria-hidden="true">→</span>
                </button>
              </article>
            )
          })}
        </div>
      </section>
    </main>
  )
}

function QuizSetup({ selectedCategoryId, selectedLevelId, challenge, onSelectCategory, onSelectLevel, onStart, onDashboard }) {
  const selectedCategory = categories.find((category) => category.id === selectedCategoryId)
  const selectedLevel = levels.find((level) => level.id === selectedLevelId)
  const questionCount = selectedCategory && selectedLevel
    ? selectedCategory.levels[selectedLevel.id].length
    : 0

  return (
    <main className="animate-fade-up relative z-10 mx-auto w-full max-w-6xl px-5 py-9 sm:px-8">
      <button
        className="mb-6 inline-flex items-center gap-2 rounded-lg text-sm font-semibold text-slate-500 transition hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
        onClick={onDashboard}
        type="button"
      >
        <span aria-hidden="true">←</span> Dashboard
      </button>
      <div className="mb-7">
        <p className="text-xs font-bold tracking-[0.15em] text-orange-700">MAKE IT YOUR CHALLENGE</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">Choose your quiz</h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">Pick a topic you love, then choose how challenging you want it to be.</p>
        {challenge && (
          <p className="mt-4 max-w-2xl rounded-xl border border-fuchsia-100 bg-fuchsia-50 px-4 py-3 text-sm text-fuchsia-900">
            <span className="font-bold">Surprise challenge:</span> {challenge}
          </p>
        )}
      </div>

      <section aria-labelledby="category-selection-title">
        <div className="mb-4 flex items-center gap-3">
          <span className="grid size-8 place-items-center rounded-full bg-orange-100 text-sm font-bold text-orange-800">1</span>
          <h2 id="category-selection-title" className="text-lg font-bold text-slate-900">Select a category</h2>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((category) => {
            const count = Object.values(category.levels).reduce((sum, items) => sum + items.length, 0)
            const isSelected = selectedCategoryId === category.id
            return (
              <button
                aria-pressed={isSelected}
                className={`rounded-2xl border bg-white p-4 text-left shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${
                  isSelected ? 'border-orange-400 ring-2 ring-orange-200' : 'border-slate-200 hover:border-orange-200'
                }`}
                key={category.id}
                onClick={() => onSelectCategory(category.id)}
                type="button"
              >
                <span className={`mb-3 grid size-10 place-items-center rounded-xl text-lg ${category.color}`}>{category.icon}</span>
                <span className="block text-sm font-bold text-slate-900">{category.name}</span>
                <span className="mt-1 block min-h-10 text-xs leading-5 text-slate-500">{category.description}</span>
                <span className="mt-3 block text-xs font-semibold text-orange-700">{count} questions</span>
              </button>
            )
          })}
        </div>
      </section>

      {selectedCategory && (
        <section aria-labelledby="difficulty-selection-title" className="mt-8">
          <div className="mb-4 flex items-center gap-3">
            <span className="grid size-8 place-items-center rounded-full bg-orange-100 text-sm font-bold text-orange-800">2</span>
            <div>
              <h2 id="difficulty-selection-title" className="text-lg font-bold text-slate-900">Choose your level</h2>
              <p className="mt-0.5 text-xs text-slate-500">{selectedCategory.name} · {selectedCategory.levels.easy.length} questions per challenge</p>
            </div>
          </div>
          <div className="grid gap-3 md:grid-cols-3">
            {levels.map((level) => {
              const isSelected = selectedLevelId === level.id
              return (
                <button
                  aria-pressed={isSelected}
                  className={`flex items-center justify-between rounded-2xl border bg-white p-4 text-left shadow-sm transition duration-200 hover:border-orange-300 hover:shadow-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500 ${
                    isSelected ? 'border-orange-400 ring-2 ring-orange-200' : 'border-slate-200'
                  }`}
                  key={level.id}
                  onClick={() => onSelectLevel(level.id)}
                  type="button"
                >
                  <span className="flex items-center gap-3">
                    <span className={`grid size-10 place-items-center rounded-xl text-lg ${
                      level.id === 'easy' ? 'bg-emerald-50 text-emerald-700' : level.id === 'medium' ? 'bg-amber-50 text-amber-700' : 'bg-rose-50 text-rose-700'
                    }`}>{level.id === 'easy' ? '☼' : level.id === 'medium' ? '↗' : '⚡'}</span>
                    <span>
                      <span className="block text-sm font-bold text-slate-900">{level.name}</span>
                      <span className="mt-0.5 block text-xs text-slate-500">{level.description}</span>
                    </span>
                  </span>
                  <span className="text-xs font-bold text-orange-700">+{level.points} pts</span>
                </button>
              )
            })}
          </div>
          <div className="mt-6 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-orange-100 bg-gradient-to-r from-orange-50 to-amber-50 p-4 sm:px-5">
            <p className="text-sm text-slate-600">
              {selectedLevel
                ? `${questionCount} questions · up to ${questionCount * selectedLevel.points} points`
                : 'Choose a difficulty to see your challenge details.'}
            </p>
            <button
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-orange-200 transition hover:-translate-y-0.5 hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500 disabled:cursor-not-allowed disabled:opacity-45 disabled:hover:translate-y-0"
              disabled={!selectedLevel}
              onClick={onStart}
              type="button"
            >
              Start {selectedLevel ? `${selectedLevel.name.toLowerCase()} quiz` : 'quiz'}
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </section>
      )}
    </main>
  )
}

function StatCard({ icon, iconColor, label, value, detail }) {
  return (
    <article className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm transition duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-3xl font-bold tracking-tight text-slate-900">{value}</p>
        </div>
        <span className={`grid size-10 place-items-center rounded-xl text-lg ${iconColor}`}>{icon}</span>
      </div>
      <p className="mt-3 text-xs text-slate-500">{detail}</p>
    </article>
  )
}

function QuizScreen({ category, difficulty, question, questionIndex, total, score, selected, soundEnabled, onSelect, onNext }) {
  const [timer, setTimer] = useState(() => ({
    questionIndex,
    timeLeft: QUESTION_TIME_LIMIT,
    timedOut: false,
  }))

  if (timer.questionIndex !== questionIndex) {
    setTimer({ questionIndex, timeLeft: QUESTION_TIME_LIMIT, timedOut: false })
  }

  useEffect(() => {
    if (selected !== null || timer.timedOut) return undefined

    const timeoutId = window.setTimeout(() => {
      const timeLeft = timer.timeLeft - 1
      if (timeLeft > 0 && timeLeft <= 5) playQuizSound('warning', soundEnabled)
      if (timeLeft === 0) playQuizSound('wrong', soundEnabled)

      setTimer((currentTimer) => {
        if (currentTimer.questionIndex !== questionIndex || currentTimer.timedOut || selected !== null) {
          return currentTimer
        }
        return { ...currentTimer, timeLeft, timedOut: timeLeft === 0 }
      })
    }, 1000)

    return () => window.clearTimeout(timeoutId)
  }, [questionIndex, selected, soundEnabled, timer.timeLeft, timer.timedOut])

  useEffect(() => {
    if (!timer.timedOut) return undefined
    const timeoutId = window.setTimeout(onNext, 2000)
    return () => window.clearTimeout(timeoutId)
  }, [onNext, questionIndex, timer.timedOut])

  const isCorrect = selected === question.answer
  const isLastQuestion = questionIndex === total - 1
  const answered = selected !== null || timer.timedOut

  return (
    <main className="animate-fade-up relative z-10 mx-auto flex min-h-[calc(100vh-112px)] w-full max-w-3xl flex-col justify-center px-5 py-10 sm:px-8">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold tracking-[0.17em] text-orange-700">
            {category.name.toUpperCase()} · {difficulty.name.toUpperCase()}
          </p>
          <p className="mt-1 text-sm text-slate-500">Earn {difficulty.points} points for each correct answer</p>
        </div>
        <div className="flex items-center gap-2">
          <div
            aria-label={`Time remaining: ${timer.timeLeft} seconds`}
            className={`flex items-center gap-1.5 rounded-full border px-3.5 py-2 text-sm font-bold shadow-sm ${
              timer.timeLeft <= 5 && !answered
                ? 'animate-pulse border-rose-200 bg-rose-50 text-rose-700'
                : 'border-slate-200 bg-white text-slate-600'
            }`}
            role="timer"
          >
            <span aria-hidden="true">◷</span>{timer.timeLeft}s
          </div>
          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-sm text-slate-600 shadow-sm">
            <span aria-hidden="true">✦</span>
            <span>
              <span className="font-semibold text-slate-900">{score}</span> points
            </span>
          </div>
        </div>
      </div>
      <Progress current={questionIndex + 1} total={total} />

      <div aria-live="polite" className="min-h-28">
        <p className="mb-3 text-sm font-medium text-slate-500">
          Question {String(questionIndex + 1).padStart(2, '0')}
        </p>
        <h1 className="text-3xl font-semibold leading-tight tracking-tight text-slate-900 sm:text-4xl">
          {question.prompt}
        </h1>
      </div>

      <div aria-label="Answer choices" className="mt-8 grid gap-3" role="group">
        {question.options.map((option, index) => {
          const chosen = selected === option
          const correctAnswer = answered && option === question.answer
          let optionStyle =
            'border-slate-200 bg-white text-slate-700 hover:border-orange-300 hover:bg-orange-50'

          if (answered && correctAnswer) {
            optionStyle = 'border-emerald-300 bg-emerald-50 text-emerald-800'
          } else if (chosen) {
            optionStyle = 'border-rose-300 bg-rose-50 text-rose-800'
          } else if (answered) {
            optionStyle = 'border-slate-100 bg-slate-50 text-slate-400'
          }

          return (
            <button
              aria-pressed={chosen}
              className={`flex min-h-[58px] w-full items-center gap-4 rounded-xl border px-4 text-left text-sm font-medium shadow-sm transition duration-200 sm:px-5 ${optionStyle} ${
                !answered
                  ? 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500'
                  : 'cursor-default'
              }`}
              disabled={answered}
              key={option}
              onClick={() => onSelect(option)}
              type="button"
            >
              <span className="grid size-8 shrink-0 place-items-center rounded-lg border border-current/20 text-xs font-semibold">
                {String.fromCharCode(65 + index)}
              </span>
              <span className="flex-1">{option}</span>
              {correctAnswer && <span aria-label="Correct answer">✓</span>}
              {chosen && !isCorrect && <span aria-label="Incorrect answer">×</span>}
            </button>
          )
        })}
      </div>

      <div aria-live="polite" className="mt-5 min-h-[76px]">
        {answered && (
          <div className="flex flex-col gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className={`text-sm font-semibold ${isCorrect ? 'text-emerald-700' : 'text-rose-700'}`}>
                {timer.timedOut
                  ? `Time’s up! The correct answer was ${question.answer}.`
                  : isCorrect ? 'That’s right!' : `Not quite — it was ${question.answer}.`}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-500">{question.note}</p>
            </div>
            {timer.timedOut ? (
              <p className="shrink-0 text-xs font-semibold text-orange-700">Moving on in 2 seconds…</p>
            ) : (
              <button
                className="inline-flex min-h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-orange-600 px-4 text-sm font-semibold text-white transition hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
                onClick={onNext}
                type="button"
              >
                {isLastQuestion ? 'See results' : 'Next question'}
                <span aria-hidden="true">→</span>
              </button>
            )}
          </div>
        )}
      </div>
    </main>
  )
}

function ResultsScreen({ category, difficulty, score, total, onRestart, onDashboard }) {
  const maxScore = total * difficulty.points
  const percentage = Math.round((score / maxScore) * 100)
  const message =
    percentage === 100
      ? 'Perfectly done!'
      : percentage >= 60
        ? 'Nicely done!'
        : 'Good warm-up!'

  return (
    <main className="animate-fade-up relative z-10 mx-auto flex min-h-[calc(100vh-112px)] w-full max-w-2xl items-center justify-center px-5 py-12 sm:px-8">
      <section className="w-full rounded-3xl border border-slate-200 bg-white px-6 py-10 text-center shadow-xl shadow-orange-100/70 sm:px-12 sm:py-14">
        <div className="mx-auto mb-6 grid size-16 place-items-center rounded-2xl bg-orange-100 text-3xl">
          {percentage >= 60 ? '🎉' : '🌱'}
        </div>
        <p className="text-xs font-semibold tracking-[0.18em] text-orange-700">
          QUIZ COMPLETE
        </p>
        <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          {message}
        </h1>
        <p className="mt-3 text-slate-500">{category.name} · {difficulty.name} challenge complete</p>
        <div className="mx-auto my-9 flex max-w-xs items-center justify-center gap-8 rounded-2xl border border-slate-200 bg-slate-50 px-7 py-5">
          <div>
            <p className="text-3xl font-bold text-slate-900">{score}<span className="text-slate-400">/{maxScore}</span></p>
            <p className="mt-1 text-xs text-slate-500">points earned</p>
          </div>
          <div className="h-10 w-px bg-slate-200" />
          <div>
            <p className="text-3xl font-bold text-orange-700">{percentage}%</p>
            <p className="mt-1 text-xs text-slate-500">correct</p>
          </div>
        </div>
        <button
          className="inline-flex min-h-12 items-center justify-center gap-3 rounded-xl bg-orange-600 px-6 py-3 text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-orange-700 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-orange-500"
          onClick={onRestart}
          type="button"
        >
          Play again <span aria-hidden="true">↻</span>
        </button>
        <button
          className="ml-3 inline-flex min-h-12 items-center justify-center rounded-xl px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
          onClick={onDashboard}
          type="button"
        >
          Back to dashboard
        </button>
      </section>
    </main>
  )
}

export default function App() {
  const [screen, setScreen] = useState('dashboard')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [selected, setSelected] = useState(null)
  const [score, setScore] = useState(0)
  const [activeCategoryId, setActiveCategoryId] = useState(null)
  const [activeLevelId, setActiveLevelId] = useState(null)
  const [activeChallenge, setActiveChallenge] = useState(null)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [bestScore, setBestScore] = useState(() => {
    if (typeof window === 'undefined') return 0
    const savedScore =
      window.localStorage.getItem('brainbox-high-score') ??
      window.localStorage.getItem('quizly-high-score')
    return Number(savedScore) || 0
  })
  const [activities, setActivities] = useState([])
  const activeCategory = categories.find((category) => category.id === activeCategoryId)
  const activeDifficulty = levels.find((level) => level.id === activeLevelId)
  const activeQuestions = activeCategory && activeDifficulty
    ? activeCategory.levels[activeDifficulty.id]
    : []

  function openSetup() {
    setActiveCategoryId(null)
    setActiveLevelId(null)
    setActiveChallenge(null)
    setScreen('setup')
  }

  function chooseCategory(categoryId, challenge = null) {
    setActiveCategoryId(categoryId)
    setActiveLevelId(null)
    if (challenge || screen === 'dashboard') setActiveChallenge(challenge)
    setScreen('setup')
  }

  function startQuiz() {
    if (!activeCategory || !activeDifficulty) return
    prepareQuizAudio(soundEnabled)
    setQuestionIndex(0)
    setSelected(null)
    setScore(0)
    setScreen('quiz')
  }

  function selectAnswer(option) {
    if (selected !== null) return
    const isCorrect = option === activeQuestions[questionIndex].answer
    playQuizSound('select', soundEnabled)
    playQuizSound(isCorrect ? 'correct' : 'wrong', soundEnabled)
    setSelected(option)
    if (isCorrect) {
      setScore((currentScore) => currentScore + activeDifficulty.points)
    }
  }

  function goToNextQuestion() {
    if (questionIndex === activeQuestions.length - 1) {
      playQuizSound('victory', soundEnabled)
      const maxScore = activeQuestions.length * activeDifficulty.points
      const percentage = Math.round((score / maxScore) * 100)
      const nextBest = Math.max(bestScore, percentage)
      window.localStorage.setItem('brainbox-high-score', String(nextBest))
      setBestScore(nextBest)
      setActivities((currentActivities) => [
        {
          id: Date.now(),
          title: `${activeCategory.name} · ${activeDifficulty.name}`,
          score: percentage,
          when: 'Just now',
        },
        ...currentActivities,
      ])
      setScreen('results')
      return
    }

    setQuestionIndex((currentQuestion) => currentQuestion + 1)
    setSelected(null)
  }

  return (
    <div className="app-shell relative min-h-screen overflow-hidden bg-[#fffaf7] text-slate-900">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-48 -top-64 size-[520px] rounded-full bg-orange-200/30 blur-[120px]" />
        <div className="absolute -right-40 top-[28rem] size-[480px] rounded-full bg-rose-100/50 blur-[130px]" />
      </div>
      <header className="relative z-10 border-b border-slate-200/70 bg-white/80 backdrop-blur-xl">
        <div className="mx-auto flex h-[68px] w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <Brand onClick={() => setScreen('dashboard')} />
          <nav aria-label="Main navigation" className="hidden items-center gap-1 sm:flex">
            <a className="rounded-lg bg-orange-50 px-3.5 py-2 text-sm font-semibold text-orange-700" href="#overview" onClick={() => setScreen('dashboard')}>Dashboard</a>
            <a className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900" href="#categories" onClick={() => setScreen('dashboard')}>Categories</a>
            <a className="rounded-lg px-3.5 py-2 text-sm font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900" href="#activity" onClick={() => setScreen('dashboard')}>Activity</a>
          </nav>
          <div className="flex items-center gap-3">
            <button
              aria-label={soundEnabled ? 'Turn sound effects off' : 'Turn sound effects on'}
              aria-pressed={soundEnabled}
              className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-600 shadow-sm transition hover:border-orange-200 hover:text-orange-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-500"
              onClick={() => {
                const nextSoundEnabled = !soundEnabled
                setSoundEnabled(nextSoundEnabled)
                if (nextSoundEnabled) prepareQuizAudio(true)
              }}
              type="button"
            >
              <span aria-hidden="true">{soundEnabled ? '🔊' : '🔇'}</span>
              <span className="hidden sm:inline">{soundEnabled ? 'Sound on' : 'Sound off'}</span>
            </button>
            <span className="hidden text-sm font-medium text-slate-500 sm:block">Good to see you</span>
            <div aria-label="Alex's profile" className="grid size-9 place-items-center rounded-full bg-gradient-to-br from-orange-500 to-rose-500 text-xs font-bold text-white shadow-sm shadow-orange-200">A</div>
          </div>
        </div>
        <nav aria-label="Mobile navigation" className="mx-auto flex max-w-6xl items-center justify-center gap-2 border-t border-slate-100 px-5 py-2 sm:hidden">
          <a className="rounded-lg bg-orange-50 px-3 py-1.5 text-xs font-semibold text-orange-700" href="#overview" onClick={() => setScreen('dashboard')}>Dashboard</a>
          <a className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900" href="#categories" onClick={() => setScreen('dashboard')}>Categories</a>
          <a className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:bg-slate-50 hover:text-slate-900" href="#activity" onClick={() => setScreen('dashboard')}>Activity</a>
        </nav>
      </header>

      {screen === 'dashboard' && (
        <Dashboard
          activities={activities}
          bestScore={bestScore}
          onSelectCategory={chooseCategory}
          onStart={openSetup}
          onWheelSelect={chooseCategory}
        />
      )}
      {screen === 'setup' && (
        <QuizSetup
          onDashboard={() => setScreen('dashboard')}
          onSelectCategory={chooseCategory}
          onSelectLevel={setActiveLevelId}
          onStart={startQuiz}
          challenge={activeChallenge}
          selectedCategoryId={activeCategoryId}
          selectedLevelId={activeLevelId}
        />
      )}
      {screen === 'quiz' && (
        <QuizScreen
          category={activeCategory}
          difficulty={activeDifficulty}
          onNext={goToNextQuestion}
          onSelect={selectAnswer}
          question={activeQuestions[questionIndex]}
          questionIndex={questionIndex}
          total={activeQuestions.length}
          score={score}
          selected={selected}
          soundEnabled={soundEnabled}
        />
      )}
      {screen === 'results' && (
        <ResultsScreen
          category={activeCategory}
          difficulty={activeDifficulty}
          onDashboard={() => setScreen('dashboard')}
          onRestart={startQuiz}
          score={score}
          total={activeQuestions.length}
        />
      )}

      <footer className="relative z-10 border-t border-slate-200/70 py-5 text-center text-xs text-slate-500">
        Brainbox · Made for curious minds
      </footer>
    </div>
  )
}
