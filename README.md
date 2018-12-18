# Semestrální práce AQZIN
## Diskretizace spojitého zdroje

### Zadání
Sestrojte program pro diskretizaci spojitého zdroje(signálu) použitím metod: 
(Spojitý zdroj (signál) realizujte libovolnou matematickou funkcí.) 
Kvantování podle amplitudy (vstupem bude šířka kvantizačního intervalu), 
Vzorkování (vstupem bude vzorkovací perioda), spojení obou předchozích

### Řešení
Applet v JavaScriptu (HTML5 Canvas), který simuluje spojitou matematickou funkci 
pomocí Beziérovych křivek a následně ji převádí na funkci diskrétní. Základní 
měřítko je 1px, mřížka je 10px malá a 50px velká. Kivku funkce je možné kreslit
pomocí myši.  

Program má dynamicky konfigurovatelné vstupní parametry:
 - Šířka kvantizačního intervalu
 - Vzorkovací perioda
 
V programu je možné generovat vstup matematických funkcí
 - Sinus
 - Kosinus
 - Lineární funkce (konstatní, rastoucí, klesající)

Vstup je možné definvat pomocí vlastnosí:
 - Definiční interval Bezierovy křivky
 - Přiblížení (koeficient) osi X
 - Přiblížení (koeficient) osi Y
 - Zaoblení Bezierovy křivky (%)
 
### Shrnutí
Program vizuálně interpretuje spojitý signál který je v reálném čase převáden 
na diskrétní funcki - digitální signál.

----------------------
## Jak spustit applet

### Online
Applet je dostupný na mojí webové stránce:  
[toomeenoo.ml/skola/aqzin-diskretizace-spojiteho-zdroje](https://toomeenoo.ml/skola/aqzin-diskretizace-spojiteho-zdroje/)
 
### Offline verze
 1. Je potřeba stáhnout celý obsah tohoto GIT repozitáře  
 2. Při stahováni souboru ZIP jej celý rozbalit do složky
 3. Otevřít soubor `index.html` pomocí webového prohlížeče
 
----------------------
## Popis kódu a jeho částí
 -  `core.js` Jádro pracující s "primitivním" Canvas rozhraním
 -  `bezierCurveEngine.js` Spracovaní spojité funkce
 -  `discretize.js` Rozdělení a vykreslení diskrétní funkce
 
----------------------
> Tomáš Molinari 12 / 2018
