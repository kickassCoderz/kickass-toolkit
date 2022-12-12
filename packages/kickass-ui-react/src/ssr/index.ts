import { DARK_THEME_VALUE, LIGHT_THEME_VALUE, THEME_ATTR_NAME, THEME_STORAGE_KEY } from '../consts'
import type { TKAUIThemeMode } from '../providers'

type TKAUICreateSSRColorSchemeScript = {
    defaultMode?: TKAUIThemeMode
}

const createKAUISSRColorSchemeScript = ({ defaultMode }: TKAUICreateSSRColorSchemeScript) => {
    return `(function () {
        try {
            var theme =JSON.parse(localStorage.getItem("${THEME_STORAGE_KEY}"));
            if (!theme) {
                if ("${defaultMode}") {
                    theme = "${defaultMode}";

                    localStorage.setItem("${THEME_STORAGE_KEY}", JSON.stringify(theme));
                } else {
                    const mql = window.matchMedia('(prefers-color-scheme: dark)');
                    if (mql.matches) {
                        theme = "${DARK_THEME_VALUE}";
                    } else {
                        theme = "${LIGHT_THEME_VALUE}";
                    }

                    localStorage.setItem("${THEME_STORAGE_KEY}", JSON.stringify(theme));
                   
                }
            }
            document.documentElement.setAttribute("${THEME_ATTR_NAME}", theme);
        } catch (e) {
            console.warn("[KAUI-SSRScript]:",e);
        }
    })();`
}

export { createKAUISSRColorSchemeScript }
