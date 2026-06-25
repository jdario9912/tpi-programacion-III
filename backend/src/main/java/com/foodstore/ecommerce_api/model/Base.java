package com.foodstore.ecommerce_api.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.SuperBuilder;
import org.hibernate.annotations.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@MappedSuperclass
@AllArgsConstructor
@NoArgsConstructor(force = true)
@SuperBuilder
@Getter
@SoftDelete(columnName = "eliminado", strategy = SoftDeleteType.DELETED)
public abstract class Base {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @EqualsAndHashCode.Include
    private Long id;

    @CreationTimestamp
    private LocalDate createdAt = LocalDate.now();

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    @Version
    Integer version;
}
