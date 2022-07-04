package org.apca.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class JwtResponse {
    private final String jwttoken;
    private String username;
    private Long userId;

}
