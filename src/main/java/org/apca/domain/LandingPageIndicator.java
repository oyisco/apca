package org.apca.domain;
import lombok.Data;
import lombok.EqualsAndHashCode;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import java.io.Serializable;
import java.util.UUID;

@Data
@Entity
public class LandingPageIndicator implements Serializable {
    @Id
    @GeneratedValue
    @EqualsAndHashCode.Include
    protected UUID id;
    private String year;
    private  String country;
    private int partners;
    private int projects;
    private int individual;
    private int institutional;
    private int grants;
    private int scholarships;
    private int adult;
    private int children;
    private int facilities;
    private int countries;
    private  int hmis;
    private int morphine;
    private int publications;
    private int palliative;
    private int research;
    private int total;


}
