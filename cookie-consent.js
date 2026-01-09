window.addEventListener("CookiebotOnConsentReady", function () {
  if (Cookiebot.consents.statistics) {
    window.dataLayer = window.dataLayer || [];
    function gtag() {
      dataLayer.push(arguments);
    }
    gtag("js", new Date());
    gtag("config", "G-DDLCL6XBQR", { anonymize_ip: true });

    const s = document.createElement("script");
    s.src = "https://www.googletagmanager.com/gtag/js?id=G-DDLCL6XBQR";
    s.async = true;
    document.head.appendChild(s);
  }
});
