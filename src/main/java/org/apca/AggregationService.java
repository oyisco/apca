package org.apca;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.AllArgsConstructor;
import org.apca.domain.Aggregations;
import org.apca.domain.Country;
import org.apca.domain.exception.ResourceException;
import org.apca.domain.repositories.AggregationRepository;
import org.apca.domain.repositories.CountryRepository;
import org.apca.request.AggregationDTO;
import org.apca.request.ServerResponse;
import org.apca.request.ServerResponse2;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.FileReader;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.UUID;

@Service
@AllArgsConstructor
public class AggregationService {
    private final AggregationRepository aggregationRepository;
    private final ObjectMapper mapper;
    private final CountryRepository countryRepository;

    public Aggregations saveOrUpDate(AggregationDTO aggregationDTO) {
        Aggregations aggregations = new Aggregations();
        if (aggregationDTO.getId() != null) {
            JsonNode jsonNodeData = mapper.valueToTree(aggregationDTO.getData());
            aggregations.setType(aggregationDTO.getType());
            aggregations.setData(jsonNodeData);
            aggregations.setId(UUID.fromString(aggregationDTO.getId()));
            aggregations.setFyPeriodYear(aggregationDTO.getFyPeriodYear());
            aggregations.setCountryId(aggregationDTO.getCountryId());
            aggregations.setUserId(aggregationDTO.getUserId());
        } else {
            JsonNode jsonNodeData = mapper.valueToTree(aggregationDTO.getData());
            aggregations.setType(aggregationDTO.getType());
            aggregations.setData(jsonNodeData);
            aggregations.setFyPeriodYear(aggregationDTO.getFyPeriodYear());
            aggregations.setCountryId(aggregationDTO.getCountryId());
            aggregations.setUserId(aggregationDTO.getUserId());
        }
        return aggregationRepository.save(aggregations);
    }

    public ServerResponse getAggregationById(String id) {
        try (FileReader fileReader = new FileReader(id)){
            BufferedReader br = new BufferedReader(fileReader);

        }catch (Exception e) {

        }finally {

        }
        Aggregations aggregations = this.aggregationRepository.findById(UUID.fromString(id))
                .orElseThrow(() -> new ResourceException("id not found: " + id));
        return ServerResponse.builder()
                .data(Objects.requireNonNull(aggregations).getData())
                .fyPeriodYear(aggregations.getFyPeriodYear())
                .userId(aggregations.getUserId())
                .type(aggregations.getType()).id(String.valueOf(aggregations.getId())).build();
    }

    public List<ServerResponse> getDataByFyPeriod(String fyPeriod) {
        return this.convertEntityToServerResponse(fyPeriod, null);
    }

    private List<ServerResponse> convertEntityToServerResponse(String fyPeriod, String type) throws ResourceException {
        List<ServerResponse> serverResponses = new ArrayList<>();

        if (fyPeriod != null) {
            this.aggregationRepository.findAggregationsByFyPeriodYear(fyPeriod).forEach(aggregations1 -> serverResponses.add(ServerResponse.builder()
                    .data(Objects.requireNonNull(aggregations1).getData())
                    .fyPeriodYear(aggregations1.getFyPeriodYear()).userId(aggregations1.getUserId())
                    .type(aggregations1.getType()).id(String.valueOf(aggregations1.getId())).build()));
        } else if (type != null) {
            this.aggregationRepository.findAggregationsByType(type).forEach(aggregations1 -> serverResponses.add(ServerResponse.builder()
                    .data(Objects.requireNonNull(aggregations1).getData())
                    .fyPeriodYear(aggregations1.getFyPeriodYear()).userId(aggregations1.getUserId())
                    .type(aggregations1.getType()).id(String.valueOf(aggregations1.getId())).build()));
        }
        return serverResponses;
    }

    //by country Period and type
    //by country and period;
    public ServerResponse2 findfyPeriodAndCountryAndType(String fyPeriod, Long countyId, String type) throws ResourceException {
        ServerResponse2 serverResponse = new ServerResponse2();
        Aggregations aggregations = this.aggregationRepository.findByFyPeriodYearAndCountryIdAndType(fyPeriod, countyId, type);
        if (aggregations != null) {
            serverResponse.setData(aggregations.getData());
            serverResponse.setType(aggregations.getType());
            serverResponse.setFyPeriodYear(aggregations.getFyPeriodYear());
            Country country = this.countryRepository.getById(aggregations.getCountryId());
            serverResponse.setCountryCode(country.getCode());
            serverResponse.setCountryName(country.getName());
            serverResponse.setCountryId(country.getId());
            serverResponse.setUserId(aggregations.getUserId());
            serverResponse.setId(String.valueOf(aggregations.getId()));

        }
        return serverResponse;
    }

    //by country and period;
    public ServerResponse2 findfyPeriodAndType(String fyPeriod,  String type) throws ResourceException {
        ServerResponse2 serverResponse = new ServerResponse2();
        Aggregations aggregations = this.aggregationRepository.findByFyPeriodYearAndType(fyPeriod, type);
        if (aggregations != null) {
            serverResponse.setData(aggregations.getData());
            serverResponse.setType(aggregations.getType());
            serverResponse.setFyPeriodYear(aggregations.getFyPeriodYear());
            Country country = this.countryRepository.getById(aggregations.getCountryId());
            serverResponse.setCountryCode(country.getCode());
            serverResponse.setCountryName(country.getName());
            serverResponse.setCountryId(country.getId());
            serverResponse.setUserId(aggregations.getUserId());
            serverResponse.setId(String.valueOf(aggregations.getId()));

        }
        return serverResponse;
    }

    public List<ServerResponse2> findfyPeriodAndCountry(String fyPeriod, Long countyId) throws ResourceException {
        List<ServerResponse2> serverResponse1 = new ArrayList<>();
        List<Aggregations> aggregations = this.aggregationRepository.findByFyPeriodYearAndCountryId(fyPeriod, countyId);
        aggregations.forEach(aggregations1 -> {
            ServerResponse2 serverResponse = new ServerResponse2();
            serverResponse.setData(aggregations1.getData());
            serverResponse.setType(aggregations1.getType());
            serverResponse.setFyPeriodYear(aggregations1.getFyPeriodYear());
            Country country = this.countryRepository.getById(aggregations1.getCountryId());
            serverResponse.setCountryCode(country.getCode());
            serverResponse.setCountryName(country.getName());
            serverResponse.setCountryId(country.getId());
            serverResponse.setUserId(aggregations1.getUserId());
            serverResponse.setId(String.valueOf(aggregations1.getId()));
            serverResponse1.add(serverResponse);
        });

        return serverResponse1;
    }

    public List<ServerResponse> getDataByType(String type) {

        return this.convertEntityToServerResponse(null, type);
    }


    public List<ServerResponse2> getAggregations() {
        List<ServerResponse2> serverResponse1 = new ArrayList<>();
        List<Aggregations> aggregations = this.aggregationRepository.findAll();
        aggregations.forEach(aggregations1 -> {
            ServerResponse2 serverResponse = new ServerResponse2();
            serverResponse.setData(aggregations1.getData());
            serverResponse.setType(aggregations1.getType());
            serverResponse.setFyPeriodYear(aggregations1.getFyPeriodYear());
            Country country = this.countryRepository.getById(aggregations1.getCountryId());
            serverResponse.setCountryCode(country.getCode());
            serverResponse.setCountryName(country.getName());
            serverResponse.setCountryId(country.getId());
            serverResponse.setUserId(aggregations1.getUserId());
            serverResponse.setId(String.valueOf(aggregations1.getId()));
            serverResponse1.add(serverResponse);
        });

        return serverResponse1;
    }



    public List<ServerResponse> getAggregationsbyUserIdAndCountry(Long userId, Long countryId) {
        List<ServerResponse> serverResponses = new ArrayList<>();
        this.aggregationRepository.findAggregationsByUserIdAndCountryId(userId,countryId).forEach(aggregations1 -> serverResponses.add(ServerResponse.builder()
                .data(Objects.requireNonNull(aggregations1).getData())
                .fyPeriodYear(aggregations1.getFyPeriodYear()).userId(aggregations1.getUserId())
                .type(aggregations1.getType()).id(String.valueOf(aggregations1.getId())).build()));
        return serverResponses;
    }
}
