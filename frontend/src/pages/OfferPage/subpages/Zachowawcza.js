import React from "react";
import { PageWrapper } from "../../../components/PageWrapper";
import { Pattern } from "../../../components/Pattern";
import {
  SubPageContainer,
  HeaderImage,
  PageTitle,
  PageText,
  PageTextColumn,
  ComeBackButton,
  List,
  ListText,
} from "./OfferSubPageElements";
const Zachowawcza = () => {
  return (
    <PageWrapper>
      <HeaderImage
        image={'url("../zachowawcza.png")'}
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      />
      <SubPageContainer
        initial={{ y: -400 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PageTitle>Zachowawcza</PageTitle>
        <PageText>
          <PageTextColumn>
            Za pomocą <strong>VITA EasyShade Compact</strong> szybko i
            jednoznacznie możemy okreslić kolor zębów Pacjenta jak również kolor
            uzupełnienia protetycznego.
            <br></br>
            <br></br>
            Stomatologia zachowawcza nazywana również stomatologią ogólną
            obejmuje najważniejsze usługi związane z prawidłową higieną jamy
            ustnej. Postawowe zabiegi z tej dziedziny związane są z profilaktyką
            próchnicy zębów oraz leczeniem wszelkiego rodzaju ubytków. Pacjenci,
            którzy systematycznie poddają się stomatologii zachowawczej
            efektywnie wzmacniają struktury zębów oraz uodparniają się na
            działanie bakterii.
            <br></br>
            <br></br>
            <strong>Piękny i zdrowy uśmiech dla każdego</strong>
            <br></br>
            Prawidłowa higiena jamy ustnej jest niezwykle ważnym elementem
            codziennej troski o zdrowie. Nawet osoby, które szczególnie dbają o
            swoje zęby poprzez regularne szczotkowanie, płukanie oraz stosowanie
            nici dentystycznych powinny przynajmniej raz na pół roku zgłaszać
            się do gabinetu dentystycznego na wizytę profilaktyczną. Tylko w
            taki sposób można na bieżąco kontrolować stan swojego uzębienia oraz
            odpowiednio wcześnie wykryć występujące ubytki.
            <br></br>
            <br></br>
            Tego typu profilaktyką zajmuje się dentysta posiadający
            specjalizację z dziedziny stomatologii zachowawczej. W trakcie
            takiej wizyty lekarz dokładnie sprawdza czy zęby nie są poddawane
            działaniu próchnicy, postawia prawidłową diagnozę oraz w razie
            potrzeby rozpoczyna niezbędne leczenie. Wszelkie uszkodzenia zębów
            zastępuje się głównie wypełnieniami, koronami, implantami lub
            mostami.
            <br></br>
            <br></br>
            Estetyka zębów jest więc niezwykle ważna oraz znacząco wpływa na
            nasze codzienne poczucie komfortu. Warto więc pamiętać o regularnych
            wizytach w gabinecie dentystycznym oraz stomatologii zachowawczej,
            która pomoże skutecznie zapobiec poważniejszym infekcjom jamy ustnej
            oraz chorobom zębów.<br></br><br></br>
            <strong>
              Dodatkowo należy zdawać sobie sprawę, że dolegliwości zębów lub
              dziąseł mogą z czasem przyczynić się do powstania innych schorzeń
              organizmu w tym chorób serca, nerek lub stawów.
            </strong>
          </PageTextColumn>
          <PageTextColumn>
            <strong>Czym zajmuje się stomatologia zachowawcza?</strong>
            <br></br>
            Do stomatologii zachowawczej zalicza się zarówno samą profilaktykę
            jamy ustnej, jak i już faktyczne leczenie ubytków próchnicznych.
            Celem zabiegów profilaktycznych jest skuteczne uniknięcie
            rozprzestrzeniania się próchnicy poprzez usunięcie kamienia
            nazębnego, co pozwoli uniknąć bolesnego oraz skomplikowanego, a
            przede wszystkim kosztownego leczenia w przyszłości. <br></br>
            <br></br>
            <strong>
              Do najpopularniejszych działań w tym zakresie należy:
            </strong>
            <List>
              <ListText>
                przeprowadzanie badań kontrolnych jamy ustnej i zębów
              </ListText>
              <ListText>
                usuwanie problemów związanych z nadwrażliwością oraz krwawieniem
                dziąseł
              </ListText>
              <ListText>
                oczyszczanie zębów z płytki nazębnej oraz kamienia
              </ListText>
              <ListText>piaskowanie</ListText>
              <ListText>skaling</ListText>
              <ListText>polerowanie</ListText>
              <ListText>lakierowanie</ListText>
              <ListText>lapisowanie zębów u dzieci</ListText>
            </List>
            <strong>
              {" "}
              Stomatologia zachowawcza obejmuje także wszelkie zabiegi dotyczące
              leczenia ubytków zębowych, które powstały na skutek próchnicy,
              między innymi:
            </strong>
            <List>
              <ListText>leczenie próchnicy zębów;</ListText>
              <ListText>wypełnianie wszelkiego rodzaju ubytków;</ListText>
              <ListText>leczenie pourazowych zębów stałych;</ListText>
              <ListText>odbudowę korony zębowej;</ListText>
              <ListText>leczenie endodontyczne, czyli kanałowe;</ListText>
              <ListText>higienizację jamy ustnej.</ListText>
            </List>
          </PageTextColumn>
        </PageText>
        <ComeBackButton to="/offer">Powrót do oferty</ComeBackButton>
      </SubPageContainer>
      <Pattern
        src="../Pattern.png"
        top="45%"
        left="40%"
        transition={{ duration: 2 }}
        initial={{ y: -200 }}
        animate={{ y: 0 }}
      />
    </PageWrapper>
  );
};

export default Zachowawcza;
