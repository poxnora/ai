package com.example.ai.exceptions;

import java.time.LocalDateTime;
import java.util.List;

public record EntityErrorResponse(
        Integer status,
        List<String> details,
        LocalDateTime timestamp) {

}