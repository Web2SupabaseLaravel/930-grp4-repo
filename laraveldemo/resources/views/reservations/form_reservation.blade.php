<form method="POST" action="{{ route('reservations.store') }}">
    @csrf
    <div class="row">

        {{-- 🔍 البحث عن مطعم --}}
        <h5>Search for Restaurant</h5>

        <div class="col-md-4">
            <label>Location</label>
            <input type="text" name="location" class="form-control">
        </div>

        <div class="col-md-4">
            <label>Cuisine (Type)</label>
            <input type="text" name="cuisine" class="form-control" placeholder="e.g., Italian, Indian">
        </div>

        <div class="col-md-4">
            <label>Date</label>
            <input type="date" name="date" class="form-control" required>
        </div>

        {{-- 🕒 الوقت --}}
   <div class="col-md-4">
    <label for="time" class="form-label">Time</label>
    <div class="d-flex">
        <select name="hour" class="form-control me-1" required>
            @for ($h = 1; $h <= 12; $h++)
                <option value="{{ sprintf('%02d', $h) }}">{{ sprintf('%02d', $h) }}</option>
            @endfor
        </select>
        :
        <select name="minute" class="form-control ms-1 me-1" required>
            <option value="00">00</option>
            <option value="15">15</option>
            <option value="30">30</option>
            <option value="45">45</option>
        </select>
        <select name="ampm" class="form-control ms-1" required>
            <option value="AM">AM</option>
            <option value="PM">PM</option>
        </select>
    </div>
</div>



        <div class="col-md-3">
            <label>Party Size</label>
            <input type="number" name="party_size" class="form-control" min="1" required>
        </div>

        <div class="col-md-3 mt-4">
            <button type="submit" class="btn btn-success w-100">Book Now</button>
        </div>

    </div>
</form>
