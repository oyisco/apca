package org.apca.web;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apca.domain.Country;
import org.apca.domain.repositories.CountryRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing Country.
 */
@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@Slf4j
public class CountryResource {

    private final CountryRepository countryRepository;

    /**
     * GET  /countries : get all the countries.
     *
     * @return the ResponseEntity with countries 200 (OK) and the list of countries in body
     */
    @GetMapping("/countries")
    public List<Country> getAllCountries(@RequestHeader("Authorization") String Authorization) {
        //LOG.debug("REST request to get all Countries");
        return countryRepository.findAll();
    }

    @GetMapping("/get-country-id/{id}")
    public Country getSingleCountry( @RequestHeader("Authorization") String Authorization,@PathVariable Long id) {
       // Country country = new Country();
        Country country = this.countryRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("ID NOT FOUND"));

        //LOG.debug("REST request to get all Countries");
        return country;
    }
    @GetMapping("/get-country-code/{code}")
    public Country getSingleCountry( @RequestHeader("Authorization") String Authorization,@PathVariable String code) {
        // Country country = new Country();
        Country country = this.countryRepository.findByCode(code)
                .orElseThrow(() -> new UsernameNotFoundException("ID NOT FOUND"));

        //LOG.debug("REST request to get all Countries");
        return country;
    }

}
