import { chromium } from "playwright";

const takeScreenshot = async (url: string, outputPath: string) => {
  console.log("browser");
  const browser = await chromium.launch();

  console.log("context");
  const context = await browser.newContext({
    deviceScaleFactor: 2,
    viewport: { width: 1600, height: 1200 },
  });

  console.log("newPage");
  const page = await context.newPage();

  console.log("goto url");
  await page.goto(url);

  console.log("waitForLoadState");
  await page.waitForLoadState("networkidle", {
    timeout: 5000,
  });

  // console.log(`timeout`);
  // await page.waitForTimeout(15000);

  console.log("screenshot");
  await page.screenshot({ path: outputPath });

  console.log("close");
  await browser.close();
};

const sites: [string, string][] = [
  // ["1403-vintage-mono-pro", "https://1403.slantedhall.com/"],
  // ["action-condensed", "http://action.commercialtype.com/"],
  // ["acumin", "http://acumin.typekit.com/"],
  // ["aeonik", "https://aeonik.co.uk/font/"],
  // ["affogato", "https://lobdell.me/affogato/"],
  // ["alef", "http://alef.hagilda.com/"],
  // ["alias", "http://www.rt-alias.com/"],
  // ["america", "http://gt-america.com/"],
  // ["antique-gothic", "https://antique-gothic.prototypo.io/"],
  // ["arpona-sans", "https://www.floodfonts.com/arponasans/"],
  // ["arpona", "https://www.floodfonts.com/arpona/"],
  // ["avara", "https://raphaelbastide.com/avara/"],
  // ["balto", "https://typesupply.com/fonts/balto"],
  // ["basteleur", "http://www.basteleur.keussel.studio"],
  // ["bikini", "https://www.floodfonts.com/bikini/"],
  // ["bungee", "https://djr.com/bungee/"],
  // ["cinderblock", "https://www.youworkforthem.com/cinderblock/"],
  // ["cinetype", "http://www.gt-cinetype.com/"],
  // ["compagnon", "http://compagnon.eesab.fr/"],
  // ["condensed-extended", "http://condensed-extended.com/"],
  // ["cortado-script", "http://cortadoscript.com/"],
  // ["daphne-script", "http://daphnescript.typemanufactur.com/"],
  // ["david-libre", "https://meirsadan.github.io/david-libre/"],
  // ["deutschkurrent", "http://deutschkurrent.typemanufactur.com/"],
  // ["dromo", "http://www.rt-dromo.com/"],
  // ["dunbar", "http://cjtype.com/dunbar/"],
  // ["editorial-new", "https://editorialnew.com/"],
  // ["eesti", "http://www.gt-eesti.com/"],
  // ["ernestine", "http://ernestinefont.com/"],
  // ["escafina", "http://escafina.losttype.com/"],
  // ["etna", "https://etna.marksimonson.com/"],
  // ["eubie-script", "https://eubiescript.daifoldes.com/"],
  // ["fabrikat", "http://fabrikatfont.com/"],
  // ["faction", "http://faction.losttype.com/"],
  // ["fictional", "https://fictional-typeface.com/"],
  // ["fit", "https://djr.com/fit/"],
  // ["flexa", "http://gt-flexa.com/"],
  // ["forester", "https://hex.xyz/Forester/"],
  // ["forma", "https://djr.com/forma/"],
  // ["franz-sans", "http://www.franzsans.de/"],
  // ["fraunces", "https://fraunces.undercase.xyz/"],
  // ["gidole", "http://gidole.github.io/"],
  // ["gimlet", "https://djr.com/gimlet/"],
  // ["halyard", "http://halyard.dardenstudio.com/"],
  // ["haptik", "http://www.gt-haptik.com/"],
  // ["harriet", "http://theharrietseries.com/"],
  // ["jeanluc", "http://carvalho-bernau.com/jlg/"],
  // ["jetbrains-mono", "https://www.jetbrains.com/lp/mono/"],
  // ["kontiki", "http://floodfonts.com/Kontiki/"],
  // ["liebling", "http://liebling.fontef.com/"],
  // ["luciole", "http://www.luciole-vision.com/"],
  // ["madefor", "https://www.wix.com/typeface/madefor"],
  // ["marigny", "https://typesupply.com/fonts/marigny"],
  // ["marvin-visions", "https://www.readvisions.com/marvin"],
  // ["merit-badge", "https://djr.com/merit-badge/"],
  // ["mono-1915", "http://mono-1915.typewalk.com/"],
  // ["monoid", "http://larsenwork.com/monoid/"],
  // ["monolisa", "https://www.monolisa.dev/"],
  // ["montecatini-pro", "https://www.louisefili.com/montecatini-pro"],
  // ["moriston", "http://moriston.losttype.com/"],
  // ["mort-modern", "https://mort-modern.losttype.com/"],
  // ["neue-din", "https://neuedin.com"],
  // ["new-transport", "http://www.newtransport.co.uk/"],
  // ["nihon", "http://www.nihon-font.com/landing/"],
  // ["niko", "http://niko.ludwigtype.de/"],
  // ["nordvest", "https://monokrom.no/nordvesttour/"],
  // ["norwester", "http://jamiewilson.io/norwester/"],
  // ["norwester-pro", "https://norwester.pro/"],
  // ["odisseia", "https://plau.co/odisseia/"],
  // ["ohm", "https://typesupply.com/fonts/ohm"],
  // ["oi", "https://kostasbartsokas.com/oi-you-mate/"],
  // ["overpass", "http://overpassfont.org/"],
  // ["pappardelle-party", "https://djr.com/pappardelle-party/"],
  // ["plex", "https://www.ibm.com/plex/"],
  // ["popper", "http://popper.hafontia.com/"],
  // ["prospectus", "http://prospectus.losttype.com/"],
  // ["pulpo", "https://www.floodfonts.com/pulpo/"],
  // ["rondelle", "http://www.rt-rondelle.com/"],
  // ["savate", "http://www.collectif-we.ch/savate/"],
  // ["scope", "http://scope-typeface.com/"],
  // ["snap-it", "https://objetpapier.fr/snap-it/"],
  // ["source-han-serif", "https://source.typekit.com/source-han-serif/"],
  // ["spectral", "https://spectral.prototypo.io/"],
  // ["stencil-gothic", "http://www.stencil-gothic.com/"],
  // ["super", "http://gt-super.com/"],
  // ["tenez", "https://plau.co/tenez/"],
  // ["terminal-grotesque", "https://raphaelbastide.com/terminalgrotesque/"],
  // ["tofino", "http://tofino.losttype.com/"],
  // ["urban-grotesk", "http://urbangrotesk.suitcasetype.com/"],
  // ["vary", "https://vary.family/"],
  // ["vinila", "https://plau.co/vinila/"],
  // ["walsheim", "http://gt-walsheim.com/"],
  // ["whirly-birdie", "https://whirlybirdie.com/"],
  // ["work-sans", "http://weiweihuanghuang.github.io/Work-Sans/"],
  // ["zirkon", "http://gt-zirkon.com/"],
  // ["zoom", "https://zoooooooom.com/"],
];

for (const [slug, url] of sites) {
  console.log({ slug, url });

  try {
    await takeScreenshot(url, `screenshots/bottom/${slug}.png`);
  } catch (error) {
    console.error(error);
  }
}
