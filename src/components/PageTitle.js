import React from 'react'
import store from '../redux/store';

function PageTitle(pageTitle) {
    const seoSettings = store.getState().settings.SeoSettings;

    //Sayfa Başlığı Görünümü
    const pageTitleSeoAdjustment = seoSettings.PageTitleSeoAdjustment;
    const pageTitleSeparator = seoSettings.PageTitleSeparator;
    const defaultTitle = seoSettings.DefaultTitle;
    const defaultMetaDescription = seoSettings.DefaultMetaDescription;
    const defaultMetaKeywords = seoSettings.DefaultMetaKeywords;

    switch (pageTitleSeoAdjustment) {
        //Firma adından sonra sayfa adı gelir
        case 0:
            document.title = defaultTitle + " " + pageTitleSeparator + " " + pageTitle;
            break;
        //Firma adı, sayfa adından sonra gelir	
        case 10:
            document.title = pageTitle + " " + pageTitleSeparator + " " + defaultTitle;
            break;
    }
}
export default PageTitle