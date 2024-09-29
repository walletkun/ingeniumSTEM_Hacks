# Name: chunk.py
# Description: Creates a class called Chunk which is filled with 
# text and meta data of a chunk of a parsed text.
# to allow for upload to pinecone.
class Chunk:
    def __init__(self, text, annotations="", source_info="", tags=""):
        """
        Initializes a Chunk object with basic metadata.
        
        :param text: The main content of the chunk.
        :param annotations: Annotations or notes related to the chunk (default is "").
        :param source_info: Information about the source, like textbook name or chapter (default is "").
        :param tags: A string of tags or keywords related to the chunk (default is "").
        """
        self.text = text
        self.annotations = annotations
        self.source_info = source_info
        self.tags = tags

