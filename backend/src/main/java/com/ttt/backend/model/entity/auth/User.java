package com.ttt.backend.model.entity.auth;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.ttt.backend.model.enums.Role;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.Date;
import java.util.List;


@Entity
@Table(name = "users")
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User implements UserDetails {
    @Setter
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private Long id;

    @Column(nullable = false, name = "fullname")
    private String fullName;

    @Setter
    @Column(unique = true, length = 100, nullable = false)
    private String email;

    @Column(nullable = false)
    @Setter
    private String password;

    @Setter
    @Column(nullable = false)
    private Role role;

    @Column(nullable = false)
    @Setter
    private Boolean isActive = false;

    @Setter
    @CreationTimestamp
    @Column(updatable = false, name = "created_at")
    private Date createdAt;

    @Setter
    @UpdateTimestamp
    @Column(name = "updated_at")
    private Date updatedAt;

    @OneToOne(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonBackReference
    private ConfirmationToken confirmationToken;

    @OneToOne(mappedBy = "user", cascade = CascadeType.REMOVE, orphanRemoval = true)
    @JsonBackReference
    private RefreshToken refreshToken;


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return List.of(new SimpleGrantedAuthority(role.toString()));
    }

    @Override
    public String getUsername() {
        return getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }

}
