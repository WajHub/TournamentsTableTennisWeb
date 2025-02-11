package com.ttt.backend.dto.request;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@ToString
@Builder
public class ChangePasswordRequest {
    private String oldPassword;
    private String newPassword;
    private String confirmationNewPassword;
}
