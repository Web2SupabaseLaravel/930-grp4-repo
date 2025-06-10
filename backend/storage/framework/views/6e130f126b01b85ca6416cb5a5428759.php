<?php $__env->startSection('content'); ?>
    <h2><?php echo e($titleForm); ?></h2>

    <?php if(session('success')): ?>
        <div style="color: green;"><?php echo e(session('success')); ?></div>
    <?php endif; ?>
    <?php if(session('error')): ?>
        <div style="color: red;"><?php echo e(session('error')); ?></div>
    <?php endif; ?>

    <form action="<?php echo e($reservation->exists ? route($route, $reservation->id) : route($route)); ?>" method="POST">
        <?php echo csrf_field(); ?>
        <?php if($method === 'put'): ?>
            <?php echo method_field('PUT'); ?>
        <?php endif; ?>

        <div>
            <label for="location">Location (الموقع):</label>
            <input type="text" name="location" id="location" value="<?php echo e(old('location', $reservation->location)); ?>" required>
            <?php $__errorArgs = ['location'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> <span style="color:red"><?php echo e($message); ?></span> <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>
        </div>

        <div>
            <label for="date">Date (التاريخ):</label>
            <input type="date" name="date" id="date" value="<?php echo e(old('date', $reservation->date)); ?>" required>
            <?php $__errorArgs = ['date'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> <span style="color:red"><?php echo e($message); ?></span> <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>
        </div>

        <div>
            <label for="time">Time (الوقت):</label>
            <input type="time" name="time" id="time" value="<?php echo e(old('time', $reservation->time)); ?>" required>
            <?php $__errorArgs = ['time'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> <span style="color:red"><?php echo e($message); ?></span> <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>
        </div>

        <div>
            <label for="duration">Duration (مدة الحجز):</label>
            <input type="text" name="duration" id="duration" value="<?php echo e(old('duration', $reservation->duration)); ?>" required>
            <?php $__errorArgs = ['duration'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> <span style="color:red"><?php echo e($message); ?></span> <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>
        </div>

        <div>
            <label for="party_size">Party Size (عدد الأشخاص):</label>
            <input type="number" name="party_size" id="party_size" min="1" value="<?php echo e(old('party_size', $reservation->party_size)); ?>" required>
            <?php $__errorArgs = ['party_size'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> <span style="color:red"><?php echo e($message); ?></span> <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>
        </div>

    

        <div>
            <label for="cuisine">Cuisine (نوع المطبخ):</label>
            <input type="text" name="cuisine" id="cuisine" value="<?php echo e(old('cuisine', $reservation->cuisine)); ?>" required>
            <?php $__errorArgs = ['cuisine'];
$__bag = $errors->getBag($__errorArgs[1] ?? 'default');
if ($__bag->has($__errorArgs[0])) :
if (isset($message)) { $__messageOriginal = $message; }
$message = $__bag->first($__errorArgs[0]); ?> <span style="color:red"><?php echo e($message); ?></span> <?php unset($message);
if (isset($__messageOriginal)) { $message = $__messageOriginal; }
endif;
unset($__errorArgs, $__bag); ?>
        </div>

        <button type="submit"><?php echo e($submitButton); ?></button>
    </form>

    <?php if(isset($reservations) && $reservations->count()): ?>
        <h3>Existing Reservations</h3>
        <ul>
            <?php $__currentLoopData = $reservations; $__env->addLoop($__currentLoopData); foreach($__currentLoopData as $r): $__env->incrementLoopIndices(); $loop = $__env->getLastLoop(); ?>
                <li>
                    <?php echo e($r->date); ?> - <?php echo e($r->location); ?> - <?php echo e($r->party_size); ?> persons
                    <a href="<?php echo e(route('reservations.edit', $r->id)); ?>">Edit</a>
                    <form action="<?php echo e(route('reservations.destroy', $r->id)); ?>" method="POST" style="display:inline;">
                        <?php echo csrf_field(); ?>
                        <?php echo method_field('DELETE'); ?>
                        <button type="submit" onclick="return confirm('هل أنت متأكد؟')">Delete</button>
                    </form>
                </li>
            <?php endforeach; $__env->popLoop(); $loop = $__env->getLastLoop(); ?>
        </ul>
    <?php endif; ?>
<?php $__env->stopSection(); ?>

<?php echo $__env->make('layouts.app', array_diff_key(get_defined_vars(), ['__data' => 1, '__path' => 1]))->render(); ?><?php /**PATH C:\Users\Administrator\Desktop\laraveldemo\laraveldemo\resources\views/reservations/form_reservation.blade.php ENDPATH**/ ?>