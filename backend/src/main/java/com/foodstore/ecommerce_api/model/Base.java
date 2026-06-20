package com.foodstore.ecommerce_api.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.SQLDelete;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDate;
import java.time.LocalDateTime;

@MappedSuperclass
@AllArgsConstructor
@NoArgsConstructor(force = true)
@SuperBuilder
@Getter
public abstract class Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @Builder.Default
    @Column(nullable = false)
    private Boolean eliminado = false;

    @CreationTimestamp
    private LocalDate createdAt = LocalDate.now();

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Version
    Integer version;
}
