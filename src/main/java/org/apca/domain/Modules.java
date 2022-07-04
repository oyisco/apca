package org.apca.domain;

import java.util.Arrays;
import java.util.stream.Collectors;

public enum Modules {
    INDICATOR,
    SERVICE_DELIVERY,
    POLICY,
    MEDICATION_TECHNOLOGY,
    EDUCATION,
    AFRICAN_PALLIATIVE_CARE,
    AGENDA_FOR_PC,
    KNOWLEDGE_PALLIATIVE_CARE,
    WEB_BASE_PCC_LEARNING_HOUSE,
    DATA_DEMAND_INFORMATION_USE,
    MANAGEMENT_LEADERSHIP_FRAMEWORK,
    HUMAN_RESOURCE_MANAGEMENT_DEVELOPMENT,
    PARTNERSHIP_POLICY_STRATEGY,
    DEVELOP_SUSTAINABLE_FINANCE_FRAMEWORK;

    public static String possibleValues() {
        return Arrays.stream(Modules.values())
                .map(Enum::toString)
                .collect(Collectors.joining(","));
    }
}
