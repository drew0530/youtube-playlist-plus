import * as $ from "jquery";
import { BehaviorSubject } from "rxjs";

export default class ThemeService {
    private themeSource = new BehaviorSubject<string>("");
    theme$ = this.themeSource.asObservable();

    constructor() {
        let theme = localStorage.getItem("theme");
        this.themeSource.next(theme || "dark_mode");
        theme == "dark_mode" ? $("body").addClass("dark_mode") : $("body").addClass("light_mode");
    }

    currentTheme(): string {
        // Leaving this here for legacy purposes TODO: remove me once all calls are observer-based
        return this.themeSource.getValue();
    }

    toggleTheme = (): void => {
        this.themeSource.next(this.themeSource.getValue() === "light_mode" ? "dark_mode" : "light_mode");
        $("body").toggleClass("dark_mode");
        $("body").toggleClass("light_mode");
        localStorage.setItem("theme", this.themeSource.getValue());
    };
}
