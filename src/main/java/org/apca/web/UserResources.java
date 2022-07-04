package org.apca.web;

import lombok.RequiredArgsConstructor;
import org.apca.JwtUserDetailsService;
import org.apca.config.JwtTokenUtil;
import org.apca.domain.Role;
import org.apca.domain.User;
import org.apca.domain.UserRoles;
import org.apca.domain.repositories.RoleRepository;
import org.apca.domain.repositories.UserRepository;
import org.apca.domain.repositories.UserRoleRepository;
import org.apca.request.ChangePassword;
import org.apca.request.LoginRequest;
import org.apca.request.SignupRequest;
import org.apca.response.JwtResponse;
import org.apca.response.MessageResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
public class UserResources {
    private final AuthenticationManager authenticationManager;
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private JwtUserDetailsService userDetailsService;
    @Autowired
    private PasswordEncoder bcryptEncoder;
    private final UserRoleRepository userRoleRepository;

    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody LoginRequest authenticationRequest) throws Exception {
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());
        final UserDetails userDetails = userDetailsService
                .loadUserByUsername(authenticationRequest.getUsername());
        final String token = jwtTokenUtil.generateToken(userDetails);

        User user = userRepository.findByUsername(authenticationRequest.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("User not found with username: "));

        return ResponseEntity.ok(new JwtResponse("Bearer " + token, authenticationRequest.getUsername(), user.getId()));
    }


//    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
//    public ResponseEntity<?> authenticateUser(@Valid @RequestBody LoginRequest loginRequest) {
//        Authentication authentication = authenticationManager.authenticate(
//                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//        String jwt = jwtTokenUtil.generateJwtToken(authentication);
//        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
//        List<String> roles = userDetails.getAuthorities().stream()
//                .map(GrantedAuthority::getAuthority)
//                .collect(Collectors.toList());
//        return ResponseEntity.ok(new JwtResponse(jwt,
//                userDetails.getId(),
//                userDetails.getUsername(),
//                roles));
//    }


    @RequestMapping(value = "/signup", method = RequestMethod.POST)
    public String registerUser(@Valid @RequestBody SignupRequest signUpRequest, @RequestHeader("Authorization") String Authorization) {
        System.out.println("SIGNUP ACCOUNT");
        Optional<User> user2 = userRepository.findByUsername(signUpRequest.getUsername());
        if (user2.isPresent()) {
            return "User already exist!";
        }
        User user = new User(signUpRequest.getUsername(), bcryptEncoder.encode(signUpRequest.getPassword()));
        List<String> modules = signUpRequest.getModules();

        List<String> countryCode = signUpRequest.getCountryCode();

        System.out.println("code " + countryCode);


        User user1 = userRepository.save(user);

        Optional<Role> role1 = roleRepository.findByName(signUpRequest.getRole());
        if (role1.isPresent()) {
            Role role2 = role1.get();
            UserRoles userRoles = new UserRoles();
            userRoles.setUserId(user1.getId());
            userRoles.setRoleId(role2.getId());
            userRoles.setModules(removeFirstAndLast(modules.toString()));
            userRoles.setCountries(removeFirstAndLast(countryCode.toString()));
            userRoleRepository.save(userRoles);


        }


        return "User registered successfully!";
    }


    public static String removeFirstAndLast(String str) {
        StringBuilder sb = new StringBuilder(str);
        sb.deleteCharAt(str.length() - 1);
        sb.deleteCharAt(0);
        return sb.toString();
    }

    private void authenticate(String username, String password) throws Exception {
        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new Exception("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            throw new Exception("INVALID_CREDENTIALS", e);
        }
    }

    @GetMapping
    public List<UserRoles> getUserRole(@RequestHeader("Authorization") String Authorization) {
        return this.userRoleRepository.findAll();

    }

    @GetMapping("get-users")
    public List<User> getUsers(@RequestHeader("Authorization") String Authorization) {
        return this.userRepository.findAll();

    }

    @GetMapping("get-users-total-count")
    public double getUsersTotalCount(@RequestHeader("Authorization") String Authorization) {
        return this.userRepository.findAll().size();

    }


    @GetMapping("/user-role/{userId}")
    public UserRoles getUsersRoleId(@PathVariable Long userId, @RequestHeader("Authorization") String Authorization) {
        return this.userRoleRepository.findUserRolesByUserId(userId);

    }

    @RequestMapping(value = "/change-password", method = RequestMethod.POST)
    public ResponseEntity<?> changePassword(@Valid @RequestBody ChangePassword changePassword, @RequestHeader("Authorization") String Authorization) {

        Optional<User> user = this.userRepository.findById(changePassword.getUserId());
        if (user.isPresent()) {
            User user1 = user.get();
            user1.setPassword(bcryptEncoder.encode(changePassword.getPassword()));
            this.userRepository.save(user1);
        } else {
            return ResponseEntity.badRequest().body("User not found");
        }

        return ResponseEntity.ok(new MessageResponse("Password changed successfully"));
    }


    @RequestMapping(value = "/update-user", method = RequestMethod.PUT)
    public ResponseEntity<?> updateUser(@Valid @RequestBody SignupRequest signUpRequest, @RequestHeader("Authorization") String Authorization) {
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            User user = new User(signUpRequest.getUserId(), signUpRequest.getUsername(), bcryptEncoder.encode(signUpRequest.getPassword()));
            List<String> modules = signUpRequest.getModules();
            List<String> countryCode = signUpRequest.getCountryCode();
            User user1 = userRepository.save(user);
            Optional<Role> role1 = roleRepository.findByName(signUpRequest.getRole());
            if (role1.isPresent()) {
                Role role2 = role1.get();
                UserRoles userRoles = new UserRoles();
                userRoles.setUserId(user1.getId());
                userRoles.setRoleId(role2.getId());
                userRoles.setModules(removeFirstAndLast(modules.toString()));
                userRoles.setCountries(removeFirstAndLast(countryCode.toString()));
                userRoleRepository.save(userRoles);

            } else {
                return ResponseEntity.badRequest().body("User role not registered ");
            }
        }


        return ResponseEntity.ok(new MessageResponse("User updated successfully!"));
    }

}
