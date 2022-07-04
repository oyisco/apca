package org.apca;

import org.apca.domain.*;
import org.apca.domain.repositories.RoleRepository;
import org.apca.domain.repositories.UserRepository;
import org.apca.domain.repositories.UserRoleRepository;
import org.apca.request.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.ArrayList;
import java.util.Optional;

@Service
public class JwtUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder bcryptEncoder;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private UserRoleRepository userRoleRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + username));
        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),
                new ArrayList<>());
    }

    public User save(LoginRequest user) {
        User newUser = new User();
        newUser.setUsername(user.getUsername());
        newUser.setPassword(bcryptEncoder.encode(user.getPassword()));
        return this.userRepository.save(newUser);
    }

    @PostConstruct
    private void createRoles() {

        Optional<Role> role = roleRepository.findByName(ERole.ROLE_ADMIN);
        if (role.isPresent()) {

        }else
        {
            Role role1 = new Role();
            role1.setName(ERole.ROLE_ADMIN);
            roleRepository.save(role1);
        }
    }
    @PostConstruct
    private void seedUsers() {
        LoginRequest loginRequest = new LoginRequest();
        loginRequest.setUsername("admin");
        loginRequest.setPassword("admin");
        signUp(loginRequest);
    }

    @PostConstruct
    public void createUser() {
        Optional<Role> role = roleRepository.findByName(ERole.ROLE_USERS);
        if (!role.isPresent()) {
            Role role1 = new Role();
            role1.setName(ERole.ROLE_USERS);
            roleRepository.save(role1);
        }
    }

    public void signUp(LoginRequest request) {
        User newUser = new User();
        newUser.setUsername(request.getUsername());
        newUser.setPassword(bcryptEncoder.encode(request.getPassword()));
        Optional<User> user = userRepository.findByUsername("admin");
        Optional<Role> role = this.roleRepository.findByName(ERole.ROLE_ADMIN);
        if (!user.isPresent()) {
            User user1 = userRepository.save(newUser);
            UserRoles userRoles = new UserRoles();
            userRoles.setUserId(user1.getId());
            if (role.isPresent()) {
                Role role1 = role.get();
                userRoles.setRoleId(role1.getId());
            }
            String modules = Modules.possibleValues();
            userRoles.setModules(modules);
            userRoleRepository.save(userRoles);
        }

    }




}