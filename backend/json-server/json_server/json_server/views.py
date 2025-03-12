from .test_data import seminars
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Event
from .serializers import EventSerializer
import time


class AddTestEvents(APIView):
    def post(self, request):
        time.sleep(1)
        for seminar in seminars:
            Event.objects.create(
                title=seminar['title'],
                description=seminar['description'],
                date=seminar['date'],
                time=seminar['time'],
                photo=seminar['photo'],
            )
        return Response(seminars)


class GetEvents(APIView):
    def get(self, request):
        time.sleep(1)

        result = []
        events = Event.objects.all()
        for event in events:
            result.append({
                'id': event.id,
                'title': event.title,
                'description': event.description,
                'date': event.date,
                'time': event.time,
                'photo': event.photo,
            }, )
        return Response(result)


class DeleteEvent(APIView):
    def post(self, request):
        time.sleep(1)

        event_id = request.data["event_id"]
        event = Event.objects.get(id=event_id)
        event.delete()
        return Response(event_id)


class UpdateEvent(APIView):
    def post(self, request):
        time.sleep(1)

        event_id = request.data["event_id"]
        event = Event.objects.get(id=event_id)

        serializer = EventSerializer(event, data=request.data['params'], partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)


class DeleteAllEvents(APIView):
    def post(self, request):
        time.sleep(1)

        events = Event.objects.all()
        response = []
        for event in events:
            response.append(event.id)
            event.delete()
        return Response(response)
