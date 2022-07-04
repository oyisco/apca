package org.apca.domain.repositories;


import org.apca.domain.Aggregations;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface AggregationRepository extends JpaRepository<Aggregations, UUID> {
    List<Aggregations> findAggregationsByFyPeriodYear(String fyiPeriod);


    List<Aggregations> findAggregationsByType(String type);

    List<Aggregations> findByFyPeriodYearAndCountryId(String fyPeriodYear, Long countryId);

    Aggregations findByFyPeriodYearAndCountryIdAndType(String fyPeriodYear, Long countryId,String type);

    List<Aggregations> findAggregationsByUserIdAndCountryId(Long userId, Long countryId);

    Aggregations findByFyPeriodYearAndType(String fyPeriodYear,String type);

}
