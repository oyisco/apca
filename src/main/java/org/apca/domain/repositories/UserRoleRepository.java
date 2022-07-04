package org.apca.domain.repositories;

import org.apca.domain.UserRoles;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.UUID;

public interface UserRoleRepository extends JpaRepository<UserRoles, UUID> {
    UserRoles findUserRolesByUserId(Long id);
}
