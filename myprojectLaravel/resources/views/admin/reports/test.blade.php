<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Laravel Reports</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body>
    <div class="container mt-5">
        <h1 class="text-center">Admin Dashboard & Reporting</h1>
        <form action="{{ route('reports.test') }}" method="POST" class="mt-4">
            
            <div class="mb-3">
                <label for="report" class="form-label">Select a Report:</label>
                <select id="report" name="report" class="form-select" required>
                    <option value="reservations">Total Reservations</option>
                    <option value="table-utilization">Table Utilization Report</option>
                    <option value="customer-demographics">Customer Demographics Report</option>
                    <option value="user-count"> Total User</option>
                    <option value="cancellations">Cancellation Rate</option>
                </select>
            </div>
            <button type="submit" class="btn btn-primary">Run Report</button>
        </form>
    </div>
</body>
</html>