package org.apca.domain.repositories;

import org.apca.domain.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CountryRepository extends JpaRepository<Country, Long> {
    @Query("select c from Country c where lower(c.code) = lower(?1) ")
    Optional<Country> findByCode(String code);
}
