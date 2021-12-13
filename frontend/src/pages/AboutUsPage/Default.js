import React from "react";
import {
  Title,
  Content,
  ContentImage,
  ContentText,
  LineAboutUs,
  DoctorName,
  Gallery
} from "./AboutUsPageElements";
const Default = () => {
  return (
    <>
      <Title primary
        transition={{ duration: 1 }}
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
      >
        Naszym celem <br /> jest...
      </Title>
      <Content
        transition={{ duration: 0.5 }}
        initial={{ opacity: 0, x: -200 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <Gallery>
        {/* <LineAboutUs /> */}
        <ContentText>
          Naszym celem jest oferowanie najlepszej jakości usług, co zapewnia
          długofalowy efekt przeprowadzanych zabiegów, a także sprawia, że
          wszyscy Pacjenci czują się u nas wyjątkowo. Dla nas, jako
          specjalistów, nie ma dla nas rzeczy niemożliwych. Podejmiemy się
          każdego wyzwania!
        </ContentText>
        <LineAboutUs />
        <DoctorName>Nasz zespół</DoctorName>
        <ContentText>
          Zespół SPS Dental Clinic tworzą doświadczeni specjaliści – doktorzy
          nauk medycznych oraz lekarze dentyści, a także dyplomowane higienistki
          i asystentki stomatologiczne. Aby wdrażać najnowocześniejsze metody
          leczenia, wszyscy z nich stale podnoszą swoje kompetencje. Poszukujesz
          sprawdzonego dentysty w Lublinie? Wybierz{" "}
          <strong>SPS Dental Clinic!</strong>
        </ContentText>
        <LineAboutUs />
        <DoctorName>Co nas wyróżnia?</DoctorName>
        <ContentText>
          Oferujemy zindywidualizowane, w pełni bezpieczne metody leczenia oraz
          rzetelną i fachową obsługę Pacjenta. Nasze gabinety wyposażone są w
          nowoczesną aparaturę, za pomocą której możemy leczyć w sposób
          maksymalnie profesjonalny i efektywny. W Lublinie jesteśmy znani jako
          jedni z najlepszych stomatologów.
          <strong> Jakość nigdy nie jest dziełem przypadku </strong> jest
          rezultatem dobrych intencji, szczerego wysiłku, odpowiedniego
          kierunku, umiejętnego wykonania
          <strong> reprezentuje mądry wybór z wielu alternatyw.</strong>
        </ContentText>
        <LineAboutUs />
        </Gallery>
      </Content>
    </>
  );
};

export default Default;
