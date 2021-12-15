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
const Implanty = () => {
  return (
    <PageWrapper>
      <HeaderImage
        image={'url("../implanty.png")'}
        initial={{ y: -200 }}
        animate={{ y: 0 }}
        transition={{ duration: 1 }}
      />
      <SubPageContainer
        initial={{ y: -400 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <PageTitle>Implanty</PageTitle>
        <PageText>
          <PageTextColumn>
            Jeśli z jakiegoś powodu dotknęła Cię utrata naturalnego uzębienia,
            najprawdopodobniej poszukujesz sposobów jego szybkiej i trwałej
            odbudowy. <br></br>
            <br></br> Z pomocą przychodzi implantologia – technika odbudowy
            uzębienia na implantach. To alternatywa dla klasycznych rozwiązań
            protetycznych, umożliwiająca osiągnięcie trwałego efektu
            estetycznego oraz przywrócenie odpowiedniej mechaniki narządu żucia.
            Dzięki przywróceniu kompletnego uzębienia znów zaczniesz cieszyć się
            pięknym uśmiechem.
            <br></br>
            <br></br>
            Opogramowanie <strong>DDS-PRO</strong> przeznaczone jest do wsparcia
            procesu diagnostycznego, przygotowania do zabiegu chirurgii
            ortognatycznej; przygotowania do zabiegu implantologii
            stomatologicznej wizualizacji 3D struktur kostnych oraz zaplanowaniu
            i symulacji zabiegu implantoprotetycznego.
            <br></br>
            <br></br>W oprogramowaniu <strong>DDS-PRO</strong> siatkę
            szczęki/żuchwy generuje się na podstawie badania tomograficznego
            pacjenta zapisanego w formacie medycznym <strong>DICOM</strong>.
            Jeśli jednak posiadamy model 3D wykonany za pomocą skanera
            wewnątrzustnego lub skanu tomograficznego wycisku szczęki lub żuchwy
            to można go zaimportować do oprogramowania <strong>DDS-Pro</strong>.
            Gwarantuje to większą dokładność rzeczywistego odwzorowania, niż
            badanie 3D pacjenta. Importowany plik musi mieć format STL.
            Następnie szablon drukujemy na drukarce 3D i po etapie sterylizacji
            jest gotowy do wykorzystania.
          </PageTextColumn>
          <PageTextColumn>
            Wykonujemy zabiegi podniesienia dna zatoki szczękowej metodą otwartą
            oraz zamkniętą. Rozwiązania protetyczne stosowane wraz z implantami:
            <List>
              <ListText>
                <strong>Brak jednego zęba</strong> – wykonanie korony na
                implantach, nie ma potrzeby szlifowania sąsiednich zębów
              </ListText>
              <ListText>
                <strong>Brak kilku zębów</strong> – stosuje się pojedyncze
                korony lub most na implantach składający się z dwóch lub
                większej liczby zębów zależnie od rozmieszczenia ubytków
              </ListText>
              <ListText>
                <strong>Całkowity brak zębów</strong> – wykorzystuje się mosty
                okrężne uzupełniające ubytek całkowity albo też na implantach
                umieszcza się protezy całkowite overdenture
              </ListText>
            </List>
            Każdy, kto chce cieszyć się z pięknego uśmiechu i komfortu, powinien
            wybrać implanty – dzięki nim można komfortowo jeść, śmiać się i
            cieszyć życiem!
            <br></br>
            <br></br>W SPS Dental Clinic mamy do zaoferowania naszym Pacjentom
            implanty klasy{" "}
            <strong>STANDARD (AlphaBio NEO, SPI, Tiologic ST)</strong> oraz
            szwajcarskie <strong>PREMIUM (Thommen Medical).</strong> <br></br><br></br>
            Do pomiaru stabilizacji implantów używamy urządzenia Osstell.
            Zabiegi wykonujemy w powiększeniu.
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

export default Implanty;
