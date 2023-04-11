

def format_errors(validation_errors):
    """
    formats flask form errors
    """
    formatted_errors = {}
    for field, error in validation_errors.items():
        formatted_errors[field] = error
    return {'errors': formatted_errors}
