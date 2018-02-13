<table class="dashboard-table">
    <tr>
      <th colspan="3" class="dashboard-table-header">Your Classes</th>
    </tr>
    <tbody>
        <tr class="dashboard-table-row" *ngFor="let device of devices" [routerLink]="['/device/' + device._id]">
          <td class="dashboard-table-cell">{{device.customId}}</td>
          <td class="dashboard-table-cell">{{device.deviceService}}</td>
          <td class="dashboard-table-cell">{{device.lastIpAddress}}</td>
          <td class="dashboard-table-cell">{{device.lastStatusUpdate}}</td>
          <td class="dashboard-table-cell">{{device.dateLastUpdated}}</td>
        </tr>
        <tr class="dashboard-table-row" [routerLink]="['/settings/devices']">
            <td class="dashboard-table-cell selectDisable" colspan="5">Add Device</td>
        </tr>
    </tbody>
    <!-- Note: Data rows filled dynamically -->
    <noscript>
      <td class="dashboard-table-cell">Loading this table requires javascript</td>
    </noscript>
</table>
