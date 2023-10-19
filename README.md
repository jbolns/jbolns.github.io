# Sustainable (vanilla-code) personal website

## Summary
My personal website. As measured by the Website Carbon Calculator, the site is greener than 98% of websites tested: [WCC report](https://www.websitecarbon.com/website/josebolanos-xyz/).

It is also quite fast. Very fast, in fact. Load speeds are measured in fractions of a second, at least as reported by [PageSpeed Insights](https://pagespeed.web.dev/analysis/https-www-josebolanos-xyz/wjdc79raih?form_factor=desktop) and [GTMetrix](https://gtmetrix.com/reports/www.josebolanos.xyz/K3Pk1msj/).

(Ps. GitHub Pages' cache settings do hurt PageSpeed Insights scores a little, but nothing I can do about that.)

## Advantage
The sustainability difference is GIGANTIC:
* Site produces only 0.02g of CO2 per visit
* An average website emits somewhere between 0.5 and 4g per visit
* Site would take 25-400 visits to generate the emissions a single visit to other websites.

The potential €€€ benefits are ENORMOUS:
* Imagine cutting cloud usage to 1/25th of what an average site currently needs
* If hosted commercially (using GH Pages at the moment since it's a personal site), this site would pay cents per month
* Think about it next time you're waiting for a website to load – bloated websites are bad for business and terrible for the environment.

Visuals were NOT sacrificed:
* The site is responsive...
* Accessible
* Fast
* It has dynamic headlines...
* Random colours
* Positions adjusted on the fly
* Background follows the user
* You can even minimise and maximise sections!

## Tehnical description, aka HOW?
The site is coded a little differently than a regular website.

I am using vanilla HTML, CSS, and JS (JQuery) and implementing App principles as part of a website. For instance, take a look at the URLs when you click links. They're different than usual. This is because the page never actually changes. Instead, sub-sections load as you click links.

Also, the site maximises JS/CSS interactions, reducing code complexity and the need for images. For instance, the JS used to minimise and maximise sections really only triggers a change in CSS classes. The heavy lifting in this effect is CSS.

And more...

## Will it break?
Absolutely! I am pushing it to the limits to experiment with ideas I can then implement more safely in commercial projects.

It will break. I will fix it. It will break again. I will fix it again.

## License
The final goal is to publish a version of this site not including personal details as open-source foundation for anyone interested in having a sustainable website.

That said, I still want to polish some details such as, for instance, the way in which the blog index is generated.

Meanwhile, please do not use without explicit permission.