const Pageres = require('pageres')
const sharp = require('sharp')
const fetch = require('node-fetch')

const { AIRTABLE_KEY } = process.env

const wait = ms => new Promise(resolve => setTimeout(resolve, ms))

const recordsUrl =
  `https://api.airtable.com/v0/apptKHbxmAAcPuZMW/specimens?api_key=${AIRTABLE_KEY}&filterByFormula=AND(Screenshot)&sortField=Slug`

const takeScreenshot = async ({
  fields: { URL: url, Delay: delay, Slug: slug },
}) => {
  await new Pageres({ delay, filename: `${slug}` })
    .src(url, ['1200x900'], { crop: true })
    .dest('screenshots')
    .run()

  await sharp(`screenshots/${slug}.png`)
    .resize(600, 450)
    .jpeg({ progressive: true, quality: 60 })
    .toFile(`screenshots/${slug}-thumb.jpg`)
}

fetch(recordsUrl)
  .then(response => response.json())
  .then(({ records }) => {
    records.forEach(takeScreenshot)
  })
