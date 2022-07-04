package org.apca.web;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.apca.AggregationService;
import org.apca.domain.Aggregations;
import org.apca.request.AggregationDTO;
import org.apca.request.ServerResponse;
import org.apca.request.ServerResponse2;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/aggregation")
@RequiredArgsConstructor
@Api(value = "Aggregation", description = "Aggregation Management")
public class AggregationsResources {
    private final AggregationService aggregationService;

    @PostMapping
    @PutMapping
    public Aggregations save(@RequestBody AggregationDTO aggregationDTO, @RequestHeader("Authorization") String Authorization) {
        return this.aggregationService.saveOrUpDate(aggregationDTO);
    }


    @GetMapping("/fy-period")
    public List<ServerResponse> getAggregationBYFIPeriod(@RequestParam("fyPeriod") String fyPeriod, @RequestHeader("Authorization") String Authorization) {
        return this.aggregationService.getDataByFyPeriod(fyPeriod);
    }

    @GetMapping("/type")
    public List<ServerResponse> getAggregationByType(@RequestParam("type") String type, @RequestHeader("Authorization") String Authorization) {
        return this.aggregationService.getDataByType(type);
    }

    @GetMapping("/id")
    public ServerResponse getAggregationById(@RequestParam("id") String id, @RequestHeader("Authorization") String Authorization) {
        return this.aggregationService.getAggregationById(id);

    }

    @GetMapping
    public List<ServerResponse2> getAggregations(@RequestHeader("Authorization") String Authorization) {
        return this.aggregationService.getAggregations();

    }



    @GetMapping("/fy-period-country")
    public List<ServerResponse2> getAggregationsPeriodAndCountryId(@RequestParam("fyPeriod") String fyPeriod, @RequestParam("countryId") Long countryId, @RequestHeader("Authorization") String Authorization) {
        return this.aggregationService.findfyPeriodAndCountry(fyPeriod,countryId);

    }

    @GetMapping("/fy-period-country-type")
    public ServerResponse2 getAggregationsPeriodAndCountryIdAndType(@RequestParam("fyPeriod") String fyPeriod, @RequestParam("countryId") Long countryId, @RequestParam("type") String type, @RequestHeader("Authorization") String Authorization) {
        return this.aggregationService.findfyPeriodAndCountryAndType(fyPeriod,countryId,type);

    }


    @GetMapping("/fy-period-type")
    public ServerResponse2 getAggregationsPeriodAndType(@RequestParam("fyPeriod") String fyPeriod,  @RequestParam("type") String type, @RequestHeader("Authorization") String Authorization) {
        return this.aggregationService.findfyPeriodAndType(fyPeriod,type);

    }



    @GetMapping("/user-id-country-id")
    public List<ServerResponse> getAggregationsUserIdAndCountryId(@RequestParam("userId") Long userId, @RequestParam("countryId") Long countryId, @RequestHeader("Authorization") String Authorization) {
        return this.aggregationService.getAggregationsbyUserIdAndCountry(userId,countryId);

    }


}
