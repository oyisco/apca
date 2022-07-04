package org.apca.request;

import lombok.Data;

@Data
public class ServerResponse2 {
    private Object data;
    private String type;
    private String id;
    private String fyPeriodYear;
    private Long countryId;
    private String countryName;
    private String countryCode;
    private Long userId;
}
