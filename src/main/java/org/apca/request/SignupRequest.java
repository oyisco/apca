package org.apca.request;

import lombok.Data;
import org.apca.domain.ERole;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;
import java.util.List;

@Data
public class SignupRequest {
    private Long userId;
    private String username;
    private List<String> modules;
    private List<String> countryCode;
    private ERole role;
    @NotBlank
    @Size(min = 6, max = 40)
    private String password;

}
