# todo/models.py

from django.db import models


# Create your models here.

# add this
class Todo(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def __unicode__(self):
        return self.name

    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'completed': self.completed
        }

    def __str__(self):
        return self.title
