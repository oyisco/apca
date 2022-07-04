package org.apca.request;

import lombok.Data;

@Data
public class ChangePassword {
    private Long userId;
    private String password;
}
