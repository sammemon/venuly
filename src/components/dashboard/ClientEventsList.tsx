"use client";

import { useState } from "react";
import { Calendar, MapPin, Users, DollarSign, X } from "lucide-react";
import { EventStatus } from "@/types";

type EventItem = {
  _id: string;
  title: string;
  description: string;
  status: EventStatus;
  location?: {
    city?: string;
    state?: string;
    country?: string;
    venue?: string;
    specificAddress?: string;
  };
  eventDate?: {
    start?: string;
    end?: string;
  };
  guestCount?: {
    min?: number;
    max?: number;
  };
  budget?: {
    min?: number;
    max?: number;
    currency?: string;
  };
  requirements?: {
    venueType?: string;
    services?: string[];
    additionalNotes?: string;
  };
  createdAt?: string;
};

type Props = {
  events: EventItem[];
};

export default function ClientEventsList({ events }: Props) {
  const [selected, setSelected] = useState<EventItem | null>(null);

  return (
    <div className="p-6 lg:p-8 space-y-4">
      {events.map((event) => (
        <button
          key={event._id}
          onClick={() => setSelected(event)}
          className="w-full text-left border border-[#DCDCDC] rounded-lg p-4 hover:shadow-md transition-shadow bg-white cursor-pointer"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
            <div>
              <h3 className="text-xl font-bold text-[#222222]">{event.title}</h3>
              <p className="text-sm text-gray-600">
                {event.location?.city || ""}
                {event.location?.city && event.location?.state ? ", " : ""}
                {event.location?.state || ""}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                event.status === EventStatus.OPEN
                  ? "bg-green-100 text-green-700"
                  : "bg-yellow-100 text-yellow-700"
              }`}
            >
              {event.status === EventStatus.OPEN ? "Published" : "Draft"}
            </span>
          </div>
          <p className="text-gray-700 mb-3 line-clamp-2">{event.description}</p>
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <div className="inline-flex items-center gap-1">
              <DollarSign className="w-4 h-4 text-[#1E93AB]" />
              <span className="font-semibold text-gray-800">Budget:</span>
              <span>
                {event.budget?.currency || "USD"} {event.budget?.min} - {event.budget?.max}
              </span>
            </div>
            <div className="inline-flex items-center gap-1">
              <Users className="w-4 h-4 text-[#1E93AB]" />
              <span className="font-semibold text-gray-800">Guests:</span>
              <span>
                {event.guestCount?.min} - {event.guestCount?.max}
              </span>
            </div>
            <div className="inline-flex items-center gap-1">
              <Calendar className="w-4 h-4 text-[#1E93AB]" />
              <span className="font-semibold text-gray-800">Dates:</span>
              <span>
                {event.eventDate?.start ? new Date(event.eventDate.start).toLocaleDateString() : "—"}
                {event.eventDate?.end ? ` - ${new Date(event.eventDate.end).toLocaleDateString()}` : ""}
              </span>
            </div>
          </div>
        </button>
      ))}

      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
          <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-[#DCDCDC] p-6 lg:p-8">
            <button
              onClick={() => setSelected(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5 text-gray-600" />
            </button>

            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
              <div>
                <p className="text-sm text-gray-500">
                  Created {selected.createdAt ? new Date(selected.createdAt).toLocaleDateString() : ""}
                </p>
                <h2 className="text-2xl font-bold text-[#222222] mt-1">{selected.title}</h2>
                <div className="mt-1 inline-flex items-center gap-1 text-sm text-gray-600">
                  <MapPin className="w-4 h-4 text-[#1E93AB]" />
                  <span>
                    {selected.location?.city || ""}
                    {selected.location?.city && selected.location?.state ? ", " : ""}
                    {selected.location?.state || ""}
                  </span>
                </div>
              </div>
              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold ${
                  selected.status === EventStatus.OPEN
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {selected.status === EventStatus.OPEN ? "Published" : "Draft"}
              </span>
            </div>

            <div className="space-y-4 text-gray-700">
              <div>
                <h3 className="text-sm font-semibold text-gray-800 mb-1">Description</h3>
                <p className="leading-relaxed">{selected.description}</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-[#1E93AB]" />
                  <div>
                    <p className="font-semibold text-gray-800">Budget</p>
                    <p>
                      {selected.budget?.currency || "USD"} {selected.budget?.min} - {selected.budget?.max}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#1E93AB]" />
                  <div>
                    <p className="font-semibold text-gray-800">Guests</p>
                    <p>
                      {selected.guestCount?.min} - {selected.guestCount?.max}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#1E93AB]" />
                  <div>
                    <p className="font-semibold text-gray-800">Dates</p>
                    <p>
                      {selected.eventDate?.start
                        ? new Date(selected.eventDate.start).toLocaleDateString()
                        : "—"}
                      {selected.eventDate?.end
                        ? ` - ${new Date(selected.eventDate.end).toLocaleDateString()}`
                        : ""}
                    </p>
                  </div>
                </div>
                {(selected.location?.venue || selected.location?.specificAddress) && (
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#1E93AB]" />
                    <div>
                      <p className="font-semibold text-gray-800">Venue</p>
                      <p className="whitespace-pre-line">
                        {selected.location?.venue || ""}
                        {selected.location?.specificAddress ? `\n${selected.location.specificAddress}` : ""}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {selected.requirements?.services?.length ? (
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">Required Services</h3>
                  <div className="flex flex-wrap gap-2">
                    {selected.requirements.services.map((service) => (
                      <span
                        key={service}
                        className="px-3 py-1 rounded-full bg-[#E6F7FB] text-[#0E7A82] text-sm font-semibold"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>
              ) : null}

              {selected.requirements?.additionalNotes ? (
                <div>
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">Additional Notes</h3>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {selected.requirements.additionalNotes}
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
