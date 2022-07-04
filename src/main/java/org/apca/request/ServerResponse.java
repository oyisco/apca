package org.apca.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ServerResponse {
    private Object data;
    private String type;
    private String id;
    private String fyPeriodYear;
    private Long countryId;
    private String countryName;
    private String countryCode;
    private Long userId;
}

