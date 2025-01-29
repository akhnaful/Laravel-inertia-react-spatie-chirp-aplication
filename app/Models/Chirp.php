<?php

namespace App\Models;

use App\Events\ChirpCreated;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Chirp extends Model
{

    use HasFactory;

    protected $fillable = [
        'message',
        'marked',
    ];

    protected $dispatchesEvents = [
        'created' => ChirpCreated::class,
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
    
    public function reports()
    {
        return $this->morphMany(Report::class, 'reported');
    }
    public function scopeFilterByTime($query, $filter)
    {
    return match ($filter) {
        'daily' => $query->whereDate('created_at', today()),
        'weekly' => $query->whereBetween('created_at', [now()->startOfWeek(), now()->endOfWeek()]),
        'monthly' => $query->whereMonth('created_at', now()->month),
        default => $query,
    };
    }
    public function scopeCreatedBetween($query, $start, $end)
    {
    return $query->whereBetween('created_at', [$start, $end]);
    }
}
