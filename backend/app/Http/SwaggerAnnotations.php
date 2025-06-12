<?php

/**
 * @OA\Schema(
 *     schema="Table",
 *     type="object",
 *     @OA\Property(property="id", type="string", description="UUID of the table"),
 *     @OA\Property(property="restaurant_id", type="string", description="UUID of the restaurant"),
 *     @OA\Property(property="size", type="integer", description="Size of the table"),
 *     @OA\Property(property="status", type="boolean", description="Availability of the table"),
 *     @OA\Property(property="location", type="string", description="Location of the table"),
 *     @OA\Property(property="table_number", type="integer", description="Table number"),
 *     @OA\Property(property="created_at", type="string", format="date-time", description="Creation timestamp"),
 *     @OA\Property(property="updated_at", type="string", format="date-time", description="Update timestamp")
 * )
 */
 