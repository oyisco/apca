package org.apca.domain.repositories;

import org.apca.domain.Aggregations;
import org.apca.domain.LandingPageIndicator;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface LandingPageRepository extends JpaRepository<LandingPageIndicator, UUID> {
    List<LandingPageIndicator> findLandingPageIndicatorByYear(String fyiPeriod);
    List<LandingPageIndicator> findLandingPageIndicatorByYearAndCountry(String fyiPeriod,String countryId);
}
