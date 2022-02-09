import React, { useState, useEffect } from "react";
import { PageWrapper } from "../../components/PageWrapper";
import { Pattern } from "../../components/Pattern";
import {
  PriceListPageContainer,
  PriceListTitle,
  PriceListMobileMenuContainer,
  PriceListMobileMenuLink,
  PriceListMobileMenuLinkWrap,
} from "./PriceListPageElements";
import { useParams } from "react-router-dom";
import PriceListSubPage from "./PriceListSubPage";
import ServiceData from "../../services/service";
import HashLoader from 'react-spinners/HashLoader'

const PriceListPage = () => {
  let params = useParams();
  let priceGroup = params["grupa"];
  const [isLoading, setIsLoading] = useState(false)
  const [serviceData, setServiceData] = useState([]);


  useEffect(() => {
    setIsLoading(true)
    ServiceData.getAll().then((response) => {
      setServiceData(response.data)
      setIsLoading(false)
    });
  }, [priceGroup]);


  return (
    <PageWrapper>
      <HashLoader
        color='#01d4bf'
        loading={isLoading}
        size={50}
        css={{ width: '100%', height: '100%' }}
      />
      {!isLoading && <><PriceListPageContainer>
        <PriceListTitle
          primary
          transition={{ type: "spring", bounce: 0.5, duration: 1.2 }}
          initial={{ x: -200 }}
          animate={{ x: 0 }}
        >
          Cennik
        </PriceListTitle>
        <PriceListTitle
          transition={{ type: "spring", bounce: 0.5, duration: 1.5 }}
          initial={{ x: -200 }}
          animate={{ x: 0 }}
        >
          {priceGroup.split("-").join(" ")}
        </PriceListTitle>
        <PriceListMobileMenuContainer>
          {serviceData.map(
            (service, i) =>
              service.uslugi.length > 0 && (
                <PriceListMobileMenuLinkWrap
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: i * 0.05 }}
                >
                  <PriceListMobileMenuLink
                    to={`/cennik/${service.grupa.split(" ").join("-")}`}
                  >
                    {service.grupa.split(" ").length > 2
                      ? `${service.grupa.split(" ")[0][0]}${
                          service.grupa.split(" ")[1][0]
                        }${service.grupa.split(" ")[2][0]}`
                      : service.grupa}
                  </PriceListMobileMenuLink>
                </PriceListMobileMenuLinkWrap>
              )
          )}
        </PriceListMobileMenuContainer>
        <PriceListSubPage group={priceGroup} />
      </PriceListPageContainer>
      <Pattern
        src="/Pattern.png"
        top={"45%"}
        left={"5%"}
        transition={{ type: "spring", bounce: 0.5, duration: 2, delay: 0.5 }}
        initial={{ opacity: 0, x: -200, rotate: 90 }}
        animate={{ opacity: 1, x: 0, rotate: 90 }}
      />
      <Pattern
        src="/Pattern.png"
        top={"5%"}
        left={"70%"}
        transition={{ type: "spring", bounce: 0.5, duration: 2, delay: 0.5 }}
        initial={{ opacity: 0, y: -200 }}
        animate={{ opacity: 1, y: 0 }}
      /></>}
    </PageWrapper>
  );
};

export default PriceListPage;
