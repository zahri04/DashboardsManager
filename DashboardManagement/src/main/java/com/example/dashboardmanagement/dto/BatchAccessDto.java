
package com.example.dashboardmanagement.dto;

import lombok.Data;
import java.util.List;

@Data
public class BatchAccessDto {
    private List<Long> dashboardIds;
    private List<Long> groupIds;
    private boolean canView;
    private boolean canEdit;
}
