package org.apca.request;

import lombok.Data;

@Data
public class AggregationDTO {
    private String id;
    private String fyPeriodYear;
    private Object data;
    private String type;
    private Long countryId;
    private Long userId;


}
