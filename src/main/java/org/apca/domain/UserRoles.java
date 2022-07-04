package org.apca.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.util.UUID;

@Entity
@Data
public class UserRoles {
    @Id
    @GeneratedValue
    @EqualsAndHashCode.Include
    protected UUID id;
    private Long userId;
    private Integer roleId;
    private String modules;
    private String countries;
}
