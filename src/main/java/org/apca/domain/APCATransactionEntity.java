package org.apca.domain;

import lombok.Data;

import javax.persistence.MappedSuperclass;
import java.time.LocalDate;

@MappedSuperclass
@Data
public abstract class APCATransactionEntity {
    private LocalDate dCreated;
    private LocalDate createdBy;

}
