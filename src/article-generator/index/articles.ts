// https://en.m.wikipedia.org/wiki/COVID-19_pandemic
const covid = [
  `Loss of sense of smell was also common.`,
  `Common symptoms are fever, cough, and fatigue.`,
  `All pubs and gyms were to close as soon as possible.`,
  `Many governments have asked people to self-quarantine.`,
  `Primary treatment is symptomatic and supportive therapy.`,
  `There is no known vaccine or specific antiviral treatment.`,
  `Those who may have it were advised to wear a mask in public.`,
  `The virus was first noted to have spread to Spain on 31 January.`,
  `Hand washing is recommended to prevent the spread of the disease.`,
  `Iran reported its first confirmed cases of infections on February.`,
  `It is most contagious during the first 3 days after the onset of symptoms.`,
  `It was reported that all new overseas arrivals will be quarantined for 2 weeks.`,
  `The Italian government ordered the full closure of all schools and universities.`,
  `Spread can happen before symptoms appear even from people who don't show symptoms.`,
  `The droplets usually fall to the ground or onto surfaces rather than travelling through air over long distances.`,
  `The time from exposure to onset of symptoms is typically around five days but may range from two to fourteen days.`,
  `Many governments have restricted or advised against all non-essential travel to and from areas affected by the outbreak.`,
  `The virus is spread between people during close contact, often via small droplets produced by coughing, sneezing, and talking.`,
  `However, the transmission may also occur through smaller droplets that are able to stay in the air for longer periods of time in enclosed spaces.`,
]

// https://simple.m.wikipedia.org/wiki/COVID-19_pandemic
const simplecovid = [
  `They also used radio stations.`,
  `Reporting criteria vary between countries.`,
  `Less food was made ready for people to eat.`,
  `Most people who contract the virus recover.`,
  `Doctors usually give patients supportive therapy.`,
  `This infected another animal, possibly a pangolin.`,
  `Farms were shut down, so there was less food made.`,
  `Processing plants and food factories were shut down.`,
  `It did not affect everyone in each country the same way.`,
  `The shutdowns and social distancing also affected animals.`,
  `Common symptoms include fever, cough, and shortness of breath.`,
  `Cases include clinically diagnosed cases as per CDC guidelines.`,
  `People lost their jobs, so they did not have money to buy food.`,
  `The outbreak might be from a coronavirus that usually lives in bats.`,
  `It then changed inside that other animal until it could infect humans.`,
  `They said the best plan was for whole communities to decide to isolate.`,
  `The actual number of infections and cases is likely to be higher than reported.`,
  `It makes people feel sick in different ways, but it usually affects the lungs. `,
  `Pollution from before the pandemic also affected what happened after people became sick.`,
  `The pandemic made it more difficult for millions of people all over the world to get enough food.`,
  `People can avoid spreading the virus by regularly washing their hands, and covering their mouth when coughing.`,
  `Because so many governments told people to stay at home, there was less air pollution than usual for that time of year. `,
  `Human beings started staying at home about the same time in the spring when sea turtles like to come on land to lay their eggs.`,
]

const sentences = [...simplecovid, ...covid].sort(
  (a: string, b: string) => a.length - b.length
)

export default sentences
