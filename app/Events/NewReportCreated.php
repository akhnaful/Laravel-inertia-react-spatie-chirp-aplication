<?php

namespace App\Events;

use App\Models\Report;
use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class NewReportCreated
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $report;
    /**
     * Create a new event instance.
     */

        public function __construct(Report $report)
        {
            $this->report = $report;
        }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return array<int, \Illuminate\Broadcasting\Channel>
     */
    public function broadcastOn()
    {
        return new PrivateChannel('admin.reports');
    }
}
