package org.apca.web;

import lombok.RequiredArgsConstructor;
import org.apache.xmlbeans.impl.xb.xsdschema.Public;
import org.apca.domain.LandingPageIndicator;
import org.apca.domain.repositories.LandingPageRepository;
import org.apca.response.LandingPageResponse;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;


@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/landing-page")
public class LandingPageIndicatorResource {
    private final LandingPageRepository landingPageRepository;


    @PostMapping
    @PutMapping
    public LandingPageIndicator saveLandingPage(LandingPageIndicator landingPageIndicator) {
        System.out.println("We Got Here");
        return this.landingPageRepository.save(landingPageIndicator);
    }


    @GetMapping("/sum-landing-page")
    public List<LandingPageResponse> getTotalSum() {
        return this.genericResponse("", "");
    }

    public List<LandingPageResponse> genericResponse(String year, String countryId) {
        List<LandingPageIndicator> landingPageIndicators = null;

        List<LandingPageResponse> landingPageResponses = new ArrayList<>();
        if (year.equals("") && countryId.equals("")) {
            landingPageIndicators = this.landingPageRepository.findAll();
        }
        if (!year.equals("") && countryId.equals("")) {
            landingPageIndicators = landingPageRepository.findLandingPageIndicatorByYear(year);
        }
        if (!(year.equals("") && countryId.equals(""))) {
            landingPageIndicators = landingPageRepository.findLandingPageIndicatorByYearAndCountry(year, countryId);
        }

        LandingPageResponse landingPageIndicator1 = new LandingPageResponse();
        landingPageIndicator1.setCountries(Objects.requireNonNull(landingPageIndicators).stream().map(LandingPageIndicator::getCountries).mapToInt(Integer::intValue).sum());
         landingPageIndicator1.setProjects( landingPageIndicators.stream().map(LandingPageIndicator::getProjects).mapToInt(Integer::intValue).sum());
        landingPageIndicator1.setPartners( landingPageIndicators.stream().map(LandingPageIndicator::getPartners).mapToInt(Integer::intValue).sum());
         landingPageIndicator1.setIndividual(landingPageIndicators.stream().map(LandingPageIndicator::getIndividual).mapToInt(Integer::intValue).sum());
         landingPageIndicator1.setInstitutional(landingPageIndicators.stream().map(LandingPageIndicator::getIndividual).mapToInt(Integer::intValue).sum());
        landingPageIndicator1.setGrants(landingPageIndicators.stream().map(LandingPageIndicator::getGrants).mapToInt(Integer::intValue).sum());
         landingPageIndicator1.setScholarships( landingPageIndicators.stream().map(LandingPageIndicator::getScholarships).mapToInt(Integer::intValue).sum());
        landingPageIndicator1.setAdult(landingPageIndicators.stream().map(LandingPageIndicator::getAdult).mapToInt(Integer::intValue).sum());
        landingPageIndicator1.setChildren(landingPageIndicators.stream().map(LandingPageIndicator::getChildren).mapToInt(Integer::intValue).sum());
        landingPageIndicator1.setFacilities(landingPageIndicators.stream().map(LandingPageIndicator::getFacilities).mapToInt(Integer::intValue).sum());
         landingPageIndicator1.setHmis( landingPageIndicators.stream().map(LandingPageIndicator::getHmis).mapToInt(Integer::intValue).sum());
         landingPageIndicator1.setMorphine(landingPageIndicators.stream().map(LandingPageIndicator::getMorphine).mapToInt(Integer::intValue).sum());
        landingPageIndicator1.setPublications(landingPageIndicators.stream().map(LandingPageIndicator::getPublications).mapToInt(Integer::intValue).sum());
        landingPageIndicator1.setPalliative(landingPageIndicators.stream().map(LandingPageIndicator::getPalliative).mapToInt(Integer::intValue).sum());
        landingPageIndicator1.setResearch(landingPageIndicators.stream().map(LandingPageIndicator::getResearch).mapToInt(Integer::intValue).sum());
        landingPageResponses.add(landingPageIndicator1);
        return landingPageResponses;
    }

    @GetMapping("/get-all-by-year")
    public List<LandingPageResponse> getAllByYear(@RequestParam(name = "year") String year) {
        return this.genericResponse(year, "");
    }


    @GetMapping("/get-all-by-year-country")
    public List<LandingPageResponse> getAllByYearAndCountryId(@RequestParam(name = "year") String year, @RequestParam(name = "countryId") String countryId)
    {
        return this.genericResponse(year, countryId);
    }


}
